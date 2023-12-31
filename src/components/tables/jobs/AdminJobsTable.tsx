import {MdDeleteForever} from "react-icons/md";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.tsx";
import {assignEmployees, deleteJob} from "../../../api/AdminApi.ts";
import DeleteJobModal from "../../modals/DeleteJobModal.tsx";
import AssignEmployeesModal from "../../modals/AssignEmployeesModal.tsx";
import {Button} from "react-bootstrap";
import {BsDashCircle, BsPlusCircle} from "react-icons/bs";
import formatDate from "../../../utils/formatDate.ts";
import convertTimeslot from "../../../utils/convertTimslot.ts";

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

export function AdminJobsTable({jobs, statuses, setTriggerUpdateOfJobs, setIsLoadingJobsData}: IJobsTable) {
    const {employeeId} = useContext(AuthContext);
    const [jobId, setJobId] = useState<string>("");
    const [timeslot, setTimeslot] = useState<string>("");
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const handleCloseAssignModal = () => setShowAssignModal(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const [isAssigning, setIsAssigning] = useState<boolean>(false);
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

    async function handleAssignEmployees() {
        setIsAssigning(true);
        const response = await assignEmployees(jobId, employeeId, selectedEmployeeIds);
        if (response?.status == 200) {
            setTriggerUpdateOfJobs(value => !value);
            setIsLoadingJobsData(() => true);
            setIsAssigning(false);
            handleCloseAssignModal();
        }
    }

    async function handleDelete() {
        const response = await deleteJob(jobId, employeeId);
        if (response?.status == 200) {
            setTriggerUpdateOfJobs(value => !value);
            handleCloseDeleteModal();
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
                        <th className="text-center" scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs?.map((job: Job) => {
                        const isApproved: boolean = job.jobStatus == ("APPROVED" || "CLOSED");

                        if (!statuses || statuses.includes(job.jobStatus as JobStatus)) {
                            return (
                                <tr key={job.jobId} className="align-middle">
                                    <td>{job.jobId}</td>
                                    <td>{job.jobType}</td>
                                    <td>{formatDate(job.date)}</td>
                                    <td style={{minWidth: 60}}>{convertTimeslot(job.timeslot)}</td>
                                    <td className={setStatusColor(job.jobStatus)}>{job.jobStatus}</td>
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
                                                    : <>{job.customerId.substring(0, 12)}... <BsPlusCircle /></>
                                            }
                                        </Button>
                                    </td>
                                    <td>
                                        {job.employees.length === 0 || job.jobStatus === "NOT_APPROVED" ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setJobId(job.jobId);
                                                    setShowAssignModal(true);
                                                }}
                                            >
                                                Assign employee(s)
                                            </button>
                                        ) : (
                                            job.employees.join(", ")
                                        )}
                                    </td>
                                    <td className="text-center">
                                        {
                                            !isApproved &&
                                            <button
                                                className={"btn focus-ring focus-ring-light"}
                                                type="button"
                                                aria-label="Press button to delete job"
                                                onClick={() => {
                                                    setJobId(job.jobId);
                                                    setTimeslot(job.timeslot);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                <MdDeleteForever color="#dc3545" size={30}/>
                                            </button>
                                        }
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                    </tbody>
                </table>
            </div>
            <AssignEmployeesModal
                jobId={jobId}
                timeslot={timeslot}
                onShow={showAssignModal}
                onClose={handleCloseAssignModal}
                setSelectedEmployeeIds={setSelectedEmployeeIds}
                handleAssign={handleAssignEmployees}
                isAssigning={isAssigning}
            />
            <DeleteJobModal
                jobId={jobId}
                onShow={showDeleteModal}
                onClose={handleCloseDeleteModal}
                handleDelete={handleDelete}
            />
        </>

    )
}