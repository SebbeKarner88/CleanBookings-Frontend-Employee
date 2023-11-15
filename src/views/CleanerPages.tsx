import { NavBar } from "../components/common/NavBar.tsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
// import GDPREmployeeData from "../components/gdpr-management/GDPREmployeeData.tsx";
// import EmployeeCleaningsPerType from "../components/EmployeeCleaningsPerType.tsx";
import { getJobsByCleanerId } from "../api/CleanerApi.ts";
import StatusFilter from "../components/tables/jobs/statusfilter/StatusFilter.tsx";
import { CleanerJobsTable } from "../components/tables/jobs/CleanerJobsTable.tsx";
import JobsTablePlaceholder from "../components/tables/jobs/JobsTablePlaceholder.tsx";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoSettingsOutline } from "react-icons/io5";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}


export default function CleanerPages() {
    const { employeeId, username } = useContext(AuthContext);
    const [ jobs, setJobs ] = useState<Job[]>([]);
    const [ selectedStatus, setSelectedStatus ] = useState<JobStatus[]>([ "OPEN", "ASSIGNED", "WAITING_FOR_APPROVAL", "NOT_APPROVED", "APPROVED", "CLOSED" ]);
    const [ triggerUpdateOfJobs, setTriggerUpdateOfJobs ] = useState<boolean>(false);
    const [ isLoadingJobsData, setIsLoadingJobsData ] = useState<boolean>(true);


    useEffect(() => {
        setIsLoadingJobsData(true);
        fetchJobsData().then(data => {
            setJobs(data);
            setIsLoadingJobsData(false);
        });
    }, [ triggerUpdateOfJobs ]);

    async function fetchJobsData() {
        try {
            const response = await getJobsByCleanerId(employeeId);
            if (response?.status == 200)
                return response.data;
            else
                return [];
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
            data-bs-theme="dark">
            <NavBar />

            <div className="d-flex flex-column align-items-end">
                <p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>

                <Link to="/my-pages/employee-settings">
                    <Button size="lg" variant="btn-link" className="btn-dark-purple m-3">
                        <IoSettingsOutline
                            color="var(--beige)"
                            size={30}
                            aria-label="Inställningar" />
                    </Button>
                </Link>
            </div>

            <h1 className="text-md-center fw-bold my-3 mb-md-5 mx-2">Cleaner Dashboard</h1>

            <div className="container">
                <h2 className="text-md-center fw-bold my-3 text-info">Assignments</h2>
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                <div className="my-3">
                    {
                        isLoadingJobsData
                            ? <JobsTablePlaceholder />
                            : <CleanerJobsTable
                                jobs={jobs}
                                statuses={selectedStatus}
                                setTriggerUpdateOfJobs={setTriggerUpdateOfJobs}
                                setIsLoadingJobsData={setIsLoadingJobsData}
                            />
                    }
                </div>
            </div>
        </div>
    )
}