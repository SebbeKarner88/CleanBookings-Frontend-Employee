import StatusFilter from "../../../components/tables/jobs/statusfilter/StatusFilter.tsx";
import JobsTablePlaceholder from "../../../components/tables/jobs/JobsTablePlaceholder.tsx";
import {AdminJobsTable} from "../../../components/tables/jobs/AdminJobsTable.tsx";
import {Dispatch, SetStateAction} from "react";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface IJobTab {
    jobs: Job[] | undefined;
    selectedStatus: JobStatus[];
    setSelectedStatus: Dispatch<SetStateAction<JobStatus[]>>;
    setTriggerUpdateOfJobs: Dispatch<SetStateAction<boolean>>;
    isLoadingJobsData: boolean;
    setIsLoadingJobsData: Dispatch<SetStateAction<boolean>>;
}

interface Job {
    jobId: string,
    jobType: string,
    timeslot: string,
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}

export default function JobTab({
                                   jobs,
                                   selectedStatus,
                                   setSelectedStatus,
                                   setTriggerUpdateOfJobs,
                                   isLoadingJobsData,
                                   setIsLoadingJobsData
                               }: IJobTab) {
    return (
        <div className="container">
            <h2 className="text-md-center fw-bold my-3 text-primary-emphasis">Current jobs</h2>
            <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
            <div className="my-3">
                {
                    isLoadingJobsData
                        ? <JobsTablePlaceholder/>
                        : <AdminJobsTable
                            jobs={jobs}
                            statuses={selectedStatus}
                            setTriggerUpdateOfJobs={setTriggerUpdateOfJobs}
                            setIsLoadingJobsData={setIsLoadingJobsData}
                        />
                }
            </div>
        </div>
    )
}