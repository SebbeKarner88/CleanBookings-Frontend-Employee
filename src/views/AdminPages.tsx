import {NavBar} from "../components/common/NavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {getAllJobs} from "../api/AdminApi.ts";
import {JobsTable} from "../components/tables/jobs/JobsTable.tsx";
import StatusFilter from "../components/tables/jobs/StatusFilter.tsx";
import {CustomersTable} from "../components/tables/customers/CustomersTable.tsx";
import JobsTablePlaceholder from "../components/tables/jobs/JobsTablePlaceholder.tsx";
import EmployeeCleaningsPerType from "../components/EmployeeCleaningsPerType.tsx";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}

export default function AdminPages() {
    const {employeeId, username} = useContext(AuthContext);
    const [jobs, setJobs] = useState<Job[]>();
    const [selectedStatus, setSelectedStatus] = useState<string[]>(["OPEN" as JobStatus, "NOT_APPROVED" as JobStatus]);
    const [triggerUpdateOfJobs, setTriggerUpdateOfJobs] = useState<boolean>(false);
    const [isLoadingJobsData, setIsLoadingJobsData] = useState<boolean>(true);

    useEffect(() => {
        fetchJobs().then(data => {
            setJobs(data);
            setIsLoadingJobsData(false);
        });
    }, [triggerUpdateOfJobs]);

    async function fetchJobs() {
        try {
            const response = await getAllJobs(employeeId);
            if (response?.status == 200)
                return response.data;
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    return (
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
             data-bs-theme="dark">
            <NavBar/>
            <p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>
            <h1 className="text-md-center fw-bold my-3 mb-md-5 mx-2">Admin Dashboard</h1>

            <div className="container">
                <h2 className="text-md-center fw-bold my-3">Current jobs</h2>
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
                <div className="my-3">
                    {
                        isLoadingJobsData
                            ? <JobsTablePlaceholder/>
                            : <JobsTable
                                jobs={jobs}
                                statuses={selectedStatus}
                                setTriggerUpdateOfJobs={setTriggerUpdateOfJobs}
                                setIsLoadingJobsData={setIsLoadingJobsData}
                            />
                    }
                </div>
            </div>

            <div className="container">
                <h2 className="text-md-center fw-bold my-3">Customers</h2>
                <div className="my-3">
                    <CustomersTable/>
                </div>
            </div>

            <div className="container">
                <h2 className="text-md-center fw-bold my-3">Jobs per type</h2>
                <div className="my-3">
                    <EmployeeCleaningsPerType/>
                </div>
            </div>

        </div>
    )
}