import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import EmployeeDataResponse from '../dto/EmployeeDataResponse'; // Replace with your EmployeeDataResponse DTO
import {Button, Modal} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import {AuthContext} from '../../context/AuthContext';

const GDPREmployeeData: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<EmployeeDataResponse | null>(null);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const {employeeId} = useContext(AuthContext); // Update to use employeeId from AuthContext
    const [privacyPolicyText, setPrivacyPolicyText] = useState<string>('');

    useEffect(() => {
        // Fetch employee data from the backend using employeeId
        axios.get(
            `http://localhost:8081/api/v1/gdpr/employee-data/${employeeId}`,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            }) // Update the API endpoint
            .then((response) => {
                const data: EmployeeDataResponse = response.data;
                setEmployeeData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors here (e.g., show an error message)
            });

        // Fetch Privacy Policy text from the file
        fetch('/privacy-policy.txt')
            .then((response) => response.text())
            .then((text) => setPrivacyPolicyText(text))
            .catch((error) => {
                console.error('Error fetching Privacy Policy text:', error);
                // Handle errors here (e.g., show an error message)
            });
    }, [employeeId]);

    const handleClosePrivacyModal = () => {
        setShowPrivacyModal(false);
    };

    // const handleShowPrivacyModal = () => {
    //     setShowPrivacyModal(true);
    // };

    return (
        <div className="container">

            {/*</div>*/}
            <div className="d-flex justify-content-center">
                <div className="text-center">
                    {employeeData ? (
                        <table className="table table-bordered bg-secondary">
                            <tbody>
                            <tr>
                                <th scope="row">Employee Id</th>
                                <td>{employeeData.id}</td>
                            </tr>
                            <tr>
                                <th scope="row">First Name</th>
                                <td>{employeeData.firstName}</td>
                            </tr>
                            <tr>
                                <th scope="row">Last Name</th>
                                <td>{employeeData.lastName}</td>
                            </tr>
                            <tr>
                                <th scope="row">Phone Number</th>
                                <td>{employeeData.phoneNumber}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email Address</th>
                                <td>{employeeData.emailAddress}</td>
                            </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>Loading employee data...</p>
                    )}
                </div>
            </div>

            {/* Privacy Policy Modal */}
            <Modal show={showPrivacyModal} onHide={handleClosePrivacyModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Privacy Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactMarkdown>{privacyPolicyText}</ReactMarkdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePrivacyModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GDPREmployeeData;