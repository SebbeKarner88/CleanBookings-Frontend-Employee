import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import EmployeeDataResponse from '../dto/EmployeeDataResponse'; // Replace with your EmployeeDataResponse DTO
import { Button, Modal } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../../context/AuthContext';

const GDPREmployeeData: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<EmployeeDataResponse | null>(null);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const { employeeId } = useContext(AuthContext); // Update to use employeeId from AuthContext
    const [privacyPolicyText, setPrivacyPolicyText] = useState<string>('');

    useEffect(() => {
        // Fetch employee data from the backend using employeeId
        axios.get(`http://localhost:8080/api/v1/gdpr/employee-data/${employeeId}`) // Update the API endpoint
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
            {/*<div className="text-center">*/}
            {/*{employeeData ? (*/}
            {/*    <div>*/}
            {/*        <p><strong>Employee Id:</strong> {employeeData.id}</p>*/}
            {/*        <p><strong>First Name:</strong> {employeeData.firstName}</p>*/}
            {/*        <p><strong>Last Name:</strong> {employeeData.lastName}</p>*/}
            {/*        <p><strong>Phone Number:</strong> {employeeData.phoneNumber}</p>*/}
            {/*        <p><strong>Email Address:</strong> {employeeData.emailAddress}</p>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <p>Loading employee data...</p>*/}
            {/*)}*/}

            {/*</div>*/}
            <div className="d-flex justify-content-center">
                <div className="text-center">
                    {employeeData ? (
                        <table className="table table-bordered">
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
            {/*<div className="text-center">*/}
            {/*    {employeeData ? (*/}
            {/*        <div>*/}
            {/*            <div className="row mb-2">*/}
            {/*                <div className="col-6 text-end fw-bold">Employee Id:     </div>*/}
            {/*                <div className="col-6 text-start">{employeeData.id}</div>*/}
            {/*            </div>*/}
            {/*            <div className="row mb-2">*/}
            {/*                <div className="col-6 text-end fw-bold">First Name:      </div>*/}
            {/*                <div className="col-6 text-start">{employeeData.firstName}</div>*/}
            {/*            </div>*/}
            {/*            <div className="row mb-2">*/}
            {/*                <div className="col-6 text-end fw-bold">Last Name:......</div>*/}
            {/*                <div className="col-6 text-start">{employeeData.lastName}</div>*/}
            {/*            </div>*/}
            {/*            <div className="row mb-2">*/}
            {/*                <div className="col-6 text-end fw-bold">Phone Number:.......</div>*/}
            {/*                <div className="col-6 text-start">{employeeData.phoneNumber}</div>*/}
            {/*            </div>*/}
            {/*            <div className="row mb-2">*/}
            {/*                <div className="col-6 text-end fw-bold">Email Address:......</div>*/}
            {/*                <div className="col-6 text-start">{employeeData.emailAddress}</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <p>Loading employee data...</p>*/}
            {/*    )}*/}
            {/*</div>*/}

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