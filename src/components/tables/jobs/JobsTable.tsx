import Modal from "../../common/Modal.tsx";
import {MdDeleteForever} from "react-icons/md";
import SelectEmployees from "./SelectEmployees.tsx";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.tsx";
import {assignEmployees} from "../../../api/AdminApi.ts";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface IJobsTable {
    jobs: Job[] | undefined;
    statuses?: string[];
    triggerUpdateOfJobs: boolean;
    setTriggerUpdateOfJobs: Dispatch<SetStateAction<boolean>>;
}

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}

export function JobsTable({jobs, statuses, triggerUpdateOfJobs, setTriggerUpdateOfJobs}: IJobsTable) {
    const {employeeId} = useContext(AuthContext);
    const [jobId, setJobId] = useState<string>("");
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

    async function assignSelectedEmployeesToJob() {
        const response = await assignEmployees(jobId, employeeId, selectedEmployeeIds);
        if (response?.status == 200)
            setTriggerUpdateOfJobs(!triggerUpdateOfJobs);
    }

    function getStatusColor(status: string) {
        let className = "fw-semibold ";
        if (status == "OPEN")
            className += "text-warning"
        if (status == "NOT_APPROVED")
            className += "text-danger"
        if (status == "APPROVED" || status == "CLOSED")
            className += "text-success"
        if (status == "ASSIGNED")
            className += "text-secondary-emphasis"
        return className;
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table table-responsive table-striped table-hover" data-bs-theme="dark">
                    <thead>
                    <tr>
                        <th scope="col">Job ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Message</th>
                        <th scope="col">Customer ID</th>
                        <th className="text-center" scope="col">Employees</th>
                        <th className="text-center" scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs?.map((job: Job) => {
                        // Check if a status filter is provided and if the job's status is included in the filter
                        if (!statuses || statuses.includes(job.jobStatus as JobStatus)) {
                            return (
                                <tr key={job.jobId} className="align-middle">
                                    <td>{job.jobId}</td>
                                    <td>{job.jobType}</td>
                                    <td className={getStatusColor(job.jobStatus)}>{job.jobStatus}</td>
                                    <td>{job.jobMessage}</td>
                                    <td>{job.customerId}</td>
                                    <td>
                                        {job.employees.length === 0 || job.jobStatus === "NOT_APPROVED" ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#assignEmployeeModal"
                                                onClick={() => setJobId(job.jobId)}
                                            >
                                                Assign employee(s)
                                            </button>
                                        ) : (
                                            job.employees.join(", ")
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn focus-ring focus-ring-light"
                                            type="button"
                                            aria-label="Press button to delete job"
                                        >
                                            <MdDeleteForever color="#dc3545" size={30}/>
                                        </button>
                                    </td>
                                </tr>
                            );
                        }
                        // Job doesn't match the status filter, so return null
                        return null;
                    })}
                    </tbody>
                </table>
            </div>
            {jobId &&
                <Modal
                    id="assignEmployeeModal"
                    title={"Select employee(s) for job with id: " + jobId}
                    body={<SelectEmployees jobId={jobId} setSelectedEmployeeIds={setSelectedEmployeeIds}/>}
                    actionButtonLabel="Assign job"
                    handleActionButton={assignSelectedEmployeesToJob}
                />
            }
        </>

    )
}