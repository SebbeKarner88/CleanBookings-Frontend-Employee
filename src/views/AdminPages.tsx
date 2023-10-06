import {NavBar} from "../components/common/NavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {getAllJobs} from "../api/AdminApi.ts";
import {JobsTable} from "../components/tables/JobsTable.tsx";

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: string,
    jobMessage: string,
    customerId: string,
    employeeIds: string[]
}

export default function AdminPages() {
    const {employeeId, username} = useContext(AuthContext);
    const [jobs, setJobs] = useState<Job[]>();

    useEffect(() => {
        fetchJobs().then(data => setJobs(data));
    }, []);

    async function fetchJobs() {
        const response = await getAllJobs(employeeId);
        if (response?.status == 200)
            return response.data;
    }

    return (
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
             data-bs-theme="dark">
            <NavBar/>
            <p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>
            <h1 className="text-md-center fw-bold my-3 mx-2">Current jobs</h1>
            <div className="container">
                <div className="my-3">
                    <h2 className="text-center text-md-start fw-bolder text-warning">Unassigned</h2>
                    <JobsTable jobs={jobs} status="OPEN"/>
                </div>
                <div className="my-3">
                    <h2 className="text-center text-md-start fw-bolder text-success">In progress</h2>
                    <JobsTable jobs={jobs} status="ASSIGNED"/>
                </div>
                <div className="my-3">
                    <h2 className="text-center text-md-start fw-bolder text-danger">Not approved</h2>
                    <JobsTable jobs={jobs} status="NOT_APPROVED"/>
                </div>
            </div>
        </div>
    )
}