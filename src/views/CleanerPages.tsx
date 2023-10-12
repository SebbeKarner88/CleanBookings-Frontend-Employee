import {NavBar} from "../components/common/NavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import GDPREmployeeData from "../components/gdpr-management/GDPREmployeeData.tsx";
import EmployeeCleaningsPerType from "../components/EmployeeCleaningsPerType.tsx";
import {getAllJobsCleaner} from "../api/CleanerApi.ts";
import {JobsTableCleaner} from "../components/tables/jobs/JobsTableCleaner.tsx";
import StatusFilter from "../components/tables/jobs/StatusFilter.tsx";
import JobsTablePlaceholderCleaner from "../components/tables/jobs/JobsTablePlaceholderCleaner.tsx";
import StatusFilter from "../components/tables/jobs/StatusFilter.tsx";
import JobsTablePlaceholder from "../components/tables/jobs/JobsTablePlaceholder.tsx";
import {getJobsByCleanerId} from "../api/CleanerApi.ts";
import {CleanerJobsTable} from "../components/tables/jobs/CleanerJobsTable.tsx";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}

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
    const {employeeId, username} = useContext(AuthContext);
    const [jobs, setJobs] = useState<Job[]>();
    const [selectedStatus, setSelectedStatus] = useState<string[]>(["OPEN" as JobStatus, "NOT_APPROVED" as JobStatus]);
    const [triggerUpdateOfJobs, setTriggerUpdateOfJobs] = useState<boolean>(false);
    const [isLoadingJobsData, setIsLoadingJobsData] = useState<boolean>(true);


    useEffect(() => {
        fetchJobsCleaner().then(data => {
            setJobs(data);
            setIsLoadingJobsData(false);
        });
    }, [triggerUpdateOfJobs]);

    async function fetchJobsCleaner() {
        try {
            const response = await getAllJobsCleaner(employeeId);
            if (response?.status == 200)
                return response.data;
        } catch (error) {
            console.error(error);
        }
        return [];
    }


    const {employeeId, username} = useContext(AuthContext);
    const [jobs, setJobs] = useState<Job[]>();
    const [selectedStatus, setSelectedStatus] = useState<string[]>(["OPEN", "ASSIGNED", "WAITING_FOR_APPROVAL", "NOT_APPROVED", "APPROVED", "CLOSED"]);
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
            const response = await getJobsByCleanerId(employeeId);
            if (response?.status == 200)
                return response.data;
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    return (
        // <div className="container-fluid bg-dark vh-100 text-bg-dark p-0 m-0">
        //     <NavBar/>
        //     <p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>
        //     <h1 className="text-bg-dark text-center">Hey cleaner!</h1>
        //     <div style={{ display: 'flex', justifyContent: 'center' }}>
        //         <h2>Jobs Per Type</h2>
        //     </div>
        //     <EmployeeCleaningsPerType />
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
             data-bs-theme="dark">
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
             data-bs-theme="dark">
            <NavBar/>
            <p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>
            <h1 className="text-md-center fw-bold my-3 mx-2">Current jobs</h1>
            <div className="container">
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
                <div className="my-3">
                    {
                        isLoadingJobsData
                            ? <JobsTablePlaceholderCleaner/>
                            : <JobsTableCleaner
                                jobs={jobs}
                                statuses={selectedStatus}
                                setTriggerUpdateOfJobs={setTriggerUpdateOfJobs}
                                setIsLoadingJobsData={setIsLoadingJobsData}
                            />
                    }
                </div>
            </div>

            <h1 className="text-md-center fw-bold my-3 mb-md-5 mx-2">Cleaner Dashboard</h1>

            <div className="container">
                <h2 className="text-md-center fw-bold my-3">My assignments</h2>
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
                <div className="my-3">
                    {
                        isLoadingJobsData
                            ? <JobsTablePlaceholder/>
                            : <CleanerJobsTable
                                jobs={jobs}
                                statuses={selectedStatus}
                                setTriggerUpdateOfJobs={setTriggerUpdateOfJobs}
                                setIsLoadingJobsData={setIsLoadingJobsData}
                            />
                    }
                </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2>Jobs Per Type</h2>
            </div>
            <div>
            <EmployeeCleaningsPerType />
            </div>
            <h2 className="text-bg-dark text-center">Din personliga information</h2>
            {/*<div className="container-fluid vh-100 d-flex justify-content-center align-items-center">*/}
            {/*    <GDPREmployeeData />*/}
            {/*</div>*/}
            <div>
                <GDPREmployeeData />
            </div>
        </div>

    )
}