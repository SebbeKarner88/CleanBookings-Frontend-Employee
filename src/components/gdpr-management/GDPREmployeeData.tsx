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

    const handleShowPrivacyModal = () => {
        setShowPrivacyModal(true);
    };

    return (
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll" data-bs-theme="dark">
            <div className="text-center">
            <h2>Employee Data</h2>
            {employeeData ? (
                <div>
                    <p><strong>Employee Id:</strong> {employeeData.id}</p>
                    <p><strong>First Name:</strong> {employeeData.firstName}</p>
                    <p><strong>Last Name:</strong> {employeeData.lastName}</p>
                    <p><strong>Employee Type:</strong> {employeeData.employeeType}</p>
                    <p><strong>Street Address:</strong> {employeeData.streetAddress}</p>
                    <p><strong>Postal Code:</strong> {employeeData.postalCode}</p>
                    <p><strong>City:</strong> {employeeData.city}</p>
                    <p><strong>Phone Number:</strong> {employeeData.phoneNumber}</p>
                    <p><strong>Email Address:</strong> {employeeData.emailAddress}</p>
                </div>
            ) : (
                <p>Loading employee data...</p>
            )}


            <Button variant="primary" onClick={handleShowPrivacyModal}>
                Privacy Policy
            </Button>
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