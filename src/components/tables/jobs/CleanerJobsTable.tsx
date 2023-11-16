import {Dispatch, SetStateAction, useContext, useState} from "react";

import {AuthContext} from "../../../context/AuthContext.tsx";
import {executedCleaningRequest} from "../../../api/CleanerApi.ts";
import UpdateJobStatusModal from "../../modals/UpdateJobStatusModal.tsx";
import {AiOutlineCheck} from "react-icons/ai";
import formatDate from "../../../utils/formatDate.ts";
import convertTimeslot from "../../../utils/convertTimslot.ts";
import {Button} from "react-bootstrap";
import {BsDashCircle, BsPlusCircle} from "react-icons/bs";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface IJobsTable {
    jobs: Job[] | undefined;
    statuses?: string[];
    setTriggerUpdateOfJobs: Dispatch<SetStateAction<boolean>>;
    setIsLoadingJobsData: Dispatch<SetStateAction<boolean>>;
}

interface Job {
    jobId: string,
    jobType: string,
    date: string,
    timeslot: string,
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}

export function CleanerJobsTable({jobs, statuses, setTriggerUpdateOfJobs, setIsLoadingJobsData}: IJobsTable) {
    const {employeeId} = useContext(AuthContext);
    const [jobId, setJobId] = useState<string>("");
    const [showUpdateJobStatusModal, setShowUpdateJobStatusModal] = useState<boolean>(false);
    const handleCloseJobStatusModal = () => setShowUpdateJobStatusModal(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [expandedRowsMessages, setExpandedRowsMessages] = useState<Record<string, boolean>>({});
    const [expandedRowsCustomerIds, setExpandedRowsCustomerIds] = useState<Record<string, boolean>>({});

    function toggleRowExpansionMessages(id: string) {
        setExpandedRowsMessages((prevExpandedRows) => ({
            ...prevExpandedRows,
            [id]: !prevExpandedRows[id],
        }));
    }

    function toggleRowExpansionCustomerIds(id: string) {
        setExpandedRowsCustomerIds((prevExpandedRows) => ({
            ...prevExpandedRows,
            [id]: !prevExpandedRows[id],
        }));
    }

    async function handleStatusChange() {
        setIsUpdating(true);
        const response = await executedCleaningRequest(employeeId, jobId);
        if (response?.status == 200) {
            setTriggerUpdateOfJobs(value => !value);
            setIsLoadingJobsData(true);
            setShowUpdateJobStatusModal(false);
            setIsUpdating(false);
        }
    }

    function setStatusColor(status: string) {
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
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Message</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Employees</th>
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
                                    <td>{formatDate(job.date)}</td>
                                    <td style={{minWidth: 60}}>{convertTimeslot(job.timeslot)}</td>
                                    <td className={setStatusColor(job.jobStatus)}>
                                        {
                                            job.jobStatus == "ASSIGNED"
                                            ? <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        setJobId(job.jobId);
                                                        setShowUpdateJobStatusModal(true);
                                                    }}
                                                >
                                                    <AiOutlineCheck size={20} />
                                                </button>
                                                : job.jobStatus
                                        }
                                    </td>
                                    <td>
                                        <Button
                                            type="button"
                                            variant="btn-link"
                                            className="text-start focus-ring focus-ring-light"
                                            onClick={() => toggleRowExpansionMessages(job.jobId)}
                                            aria-label={expandedRowsMessages[job.jobId] ? "Hide messages" : "Show messages"}>
                                            {
                                                expandedRowsMessages[job.jobId]
                                                    ? <>{job.jobMessage ? job.jobMessage : "No messages"} <BsDashCircle className="float-end"/></>
                                                    : <BsPlusCircle />
                                            }
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            type="button"
                                            variant="btn-link"
                                            className="text-start focus-ring focus-ring-light"
                                            onClick={() => toggleRowExpansionCustomerIds(job.jobId)}
                                            aria-label={expandedRowsCustomerIds[job.jobId] ? "Minimize job ID" : "Show full job ID"}>
                                            {
                                                expandedRowsCustomerIds[job.jobId]
                                                    ? <>{job.customerId} <BsDashCircle className="float-end"/></>
                                                    : <>{job.customerId.substring(0, 7)}... <BsPlusCircle /></>
                                            }
                                        </Button>
                                    </td>
                                    <td>
                                        {job.employees.join(", ")}
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
            <UpdateJobStatusModal
                onShow={showUpdateJobStatusModal}
                onClose={handleCloseJobStatusModal}
                jobId={jobId}
                handleStatusUpdate={handleStatusChange}
                isUpdating={isUpdating}
            />
        </>

    )
}