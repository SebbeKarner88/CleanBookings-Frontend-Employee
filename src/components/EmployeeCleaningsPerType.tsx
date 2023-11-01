
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Pagination from 'react-bootstrap/Pagination';

const EmployeeCleaningsPerType: React.FC = () => {
    const [cleanings, setCleanings] = useState<JobDto[]>([]);
    const { employeeId } = useContext(AuthContext);
    const role = sessionStorage.getItem("role");
    // const employeeId = "c1c25ab4-a387-4a53-b9bf-7dc98dd2666d";
    const selectedRole = role.toUpperCase().replace("client_", "");
    // const { status } = useParams<{ status: string }>();
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // Status selection field
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [jobsPerPage] = useState<number>(5);
    const authData = useContext(AuthContext);

    console.log('AuthContext Data:', authData);

    useEffect(() => {
        // Fetch cleanings based on the selected status and employeeId
        axios.get(`http://localhost:8080/api/v1/job/cleanings/employee/${employeeId}?status=${selectedStatus || ""}&role=${selectedRole || ""}`)
            .then((response) => {
                setCleanings(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [employeeId, selectedStatus]);

    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = cleanings.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            {/* Status selection field */}
            <div className="form-group">
                <label htmlFor="statusSelect">Select Job Status:</label>
                <select
                    id="statusSelect"
                    className="form-control"
                    value={selectedStatus || ""}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">ALL</option>
                    <option value="OPEN">OPEN</option>
                    <option value="ASSIGNED">ASSIGNED</option>
                    <option value="WAITING_FOR_APPROVAL">WAITING FOR APPROVAL</option>
                    <option value="NOT_APPROVED">NOT APPROVED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="CLOSED">CLOSED</option>
                </select>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">Job Status</th>
                    <th scope="col">Message</th>
                    {/*<th scope="col">Customer ID</th>*/}
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {currentJobs.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{new Date(booking.bookedDate).toLocaleDateString()}</td>
                        <td>{booking.type}</td>
                        <td>{booking.status}</td>
                        <td>{booking.message}</td>
                        {/*<td>{booking.customerId}</td>*/}
                        <td>{/* Add any actions you want here */}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <Pagination>
                    {Array.from({ length: Math.ceil(cleanings.length / jobsPerPage) }).map(
                        (_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        )
                    )}
                </Pagination>
            </div>
        </div>
    );
};

export default EmployeeCleaningsPerType;

interface JobDto {
    id: string;
    bookedDate: string;
    // bookedDate: Date;
    type: string;
    message: string;
    status: string;
    customerId: string;
}