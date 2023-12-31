import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AuthContext } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import PrivacyModal from './../components/modals/PrivacyModal';
import { NavBar } from "../components/common/NavBar.tsx";
import GDPREmployeeData from "../components/gdpr-management/GDPREmployeeData.tsx";

type Employee = {
    id: string;
    firstName: string;
    lastName: string;
    // streetAddress: string;
    // postalCode: number
    // city: string;
    phoneNumber: string
    emailAddress: string;
}

const EmployeeSettingsView = () => {
    const [ employeeData, setEmployeeData ] = useState<Employee | null>(null);
    const [ showPrivacyModal, setShowPrivacyModal ] = useState(false);
    const { employeeId } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClosePrivacyModal = () => setShowPrivacyModal(false);
    const handleShowPrivacyModal = () => setShowPrivacyModal(true);

    useEffect(() => {
        axios.get(
            `http://localhost:8081/api/v1/gdpr/employee-data/${employeeId}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
            }
        })
            .then((response) => {
                const data: Employee = response.data;
                setEmployeeData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [ employeeId ]);

    return (
        <div className="bg-dark min-vh-100 min-vw-100">
            <NavBar />
            <h1 className="text-md-center fw-semibold my-3 text-light">
                Mina inställningar
            </h1>
            <div className="container text-start my-md-4">
                {employeeData ? (
                    <div className="row my-3 mx-2 bg-beige p-4 rounded-4 border border-dark-subtle">
                        <div className="col-md-12 d-flex justify-content-between align-items-center mb-4">
                            <div className="flex-grow-1 text-center">
                                <h2 className="fw-bold my-3 text-info">
                                    Användaruppgifter
                                </h2>
                            </div>
                            <Button
                                variant="btn-outline-light"
                                className="w-auto focus-ring focus-ring-dark"
                                aria-label="Press to edit employee data"
                                type="button"
                                onClick={() => navigate("/update-employee", { state: employeeData })}
                            >
                                <MdEdit size={30} color="#FFFFFF" />
                            </Button>
                        </div>

                        <div className="container">
                            <GDPREmployeeData />
                        </div>

                        <Button
                            className='btn-dark-purple w-100 my-3'
                            onClick={handleShowPrivacyModal}>
                            Integritetspolicy - så hanterar vi din data!
                        </Button>

                        <Button
                            variant='danger'
                            className='w-100'
                            onClick={() => {
                                navigate("/my-pages")
                            }}
                        >
                            Tillbaka till mina sidor
                        </Button>
                    </div>
                ) : (
                    <p>Loading customer data...</p>
                )}
            </div>
            <PrivacyModal onShow={showPrivacyModal} onClose={handleClosePrivacyModal} />
        </div>
    );
};

export default EmployeeSettingsView;