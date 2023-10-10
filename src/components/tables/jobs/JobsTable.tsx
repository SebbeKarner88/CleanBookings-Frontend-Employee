import Modal from 'react-bootstrap/Modal';
import {MdDeleteForever} from "react-icons/md";
import SelectEmployees from "./SelectEmployees.tsx";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.tsx";
import {assignEmployees} from "../../../api/AdminApi.ts";
import {Button, Spinner} from "react-bootstrap";

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
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}

export function JobsTable({jobs, statuses, setTriggerUpdateOfJobs, setIsLoadingJobsData}: IJobsTable) {
    const {employeeId} = useContext(AuthContext);
    const [jobId, setJobId] = useState<string>("");
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleClose = () => setShowModal(false);
    const [isAssigning, setIsAssigning] = useState<boolean>(false);

    async function assignSelectedEmployeesToJob() {
        setIsAssigning(true);
        const response = await assignEmployees(jobId, employeeId, selectedEmployeeIds);
        if (response?.status == 200) {
            setTriggerUpdateOfJobs(value => !value);
            setIsLoadingJobsData(() => true);
            setIsAssigning(false);
            handleClose();
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

    function AssignEmployeesModal() {
        return (
            <Modal
                show={showModal}
                onHide={handleClose}
                fullscreen="md-down"
                scrollable={true}
            >
                <Modal.Header
                    className="bg-dark text-white"
                    closeButton
                    closeVariant="white"
                >
                    <Modal.Title className="fs-6 fw-bold text-white">
                        {"Job ID: " + jobId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    <SelectEmployees
                        jobId={jobId}
                        setSelectedEmployeeIds={setSelectedEmployeeIds}
                    />
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    {
                        isAssigning
                            ? <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    aria-label={"Sending request..."}
                                />
                            </Button>
                            : <Button
                                variant="primary"
                                onClick={assignSelectedEmployeesToJob}
                            >
                                Assign job
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
        )
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
                                    <td className={setStatusColor(job.jobStatus)}>{job.jobStatus}</td>
                                    <td>{job.jobMessage}</td>
                                    <td>{job.customerId}</td>
                                    <td>
                                        {job.employees.length === 0 || job.jobStatus === "NOT_APPROVED" ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setJobId(job.jobId);
                                                    setShowModal(true);
                                                }}
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
            {
                jobId &&
                AssignEmployeesModal()
            }
        </>

    )
}