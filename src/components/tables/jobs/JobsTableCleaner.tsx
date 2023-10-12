// import Modal from 'react-bootstrap/Modal';
// import {MdDeleteForever} from "react-icons/md";
// import SelectEmployees from "./SelectEmployees.tsx";
import {Dispatch, SetStateAction} from "react";
// import {AuthContext} from "../../../context/AuthContext.tsx";
// import {assignEmployees, deleteJob} from "../../../api/AdminApi.ts";
// import {Button, Spinner} from "react-bootstrap";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface IJobsTableCleaner {
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

export function JobsTableCleaner({jobs, statuses}: IJobsTableCleaner) {
    // const {employeeId} = useContext(AuthContext);
    // const [jobId, setJobId] = useState<string>("");
    // const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    // const [showModal, setShowModal] = useState<boolean>(false);
    // const handleClose = () => setShowModal(false);
    // const [isAssigning, setIsAssigning] = useState<boolean>(false);


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
                        <th scope="col">Status</th>
                        <th scope="col">Message</th>
                        <th scope="col">Customer ID</th>
                        {/*<th className="text-center" scope="col">Employees</th>*/}
                        {/*<th className="text-center" scope="col">Delete</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {jobs?.map((job: Job) => {
                        // const isApproved: boolean = job.jobStatus == ("APPROVED" || "CLOSED");

                        // Check if a status filter is provided and if the job's status is included in the filter
                        if (!statuses || statuses.includes(job.jobStatus as JobStatus)) {
                            return (
                                <tr key={job.jobId} className="align-middle">
                                    <td>{job.jobId}</td>
                                    <td>{job.jobType}</td>
                                    <td className={setStatusColor(job.jobStatus)}>{job.jobStatus}</td>
                                    <td>{job.jobMessage}</td>
                                    <td>{job.customerId}</td>
                                    {/*<td>*/}
                                    {/*    {job.employees.length === 0 || job.jobStatus === "NOT_APPROVED" ? (*/}
                                    {/*        <button*/}
                                    {/*            type="button"*/}
                                    {/*            className="btn btn-primary"*/}
                                    {/*            onClick={() => {*/}
                                    {/*                setJobId(job.jobId);*/}
                                    {/*                setShowModal(true);*/}
                                    {/*            }}*/}
                                    {/*        >*/}
                                    {/*            Assign employee(s)*/}
                                    {/*        </button>*/}
                                    {/*    ) : (*/}
                                    {/*        job.employees.join(", ")*/}
                                    {/*    )}*/}
                                    {/*</td>*/}
                                    {/*<td>*/}
                                    {/*    {*/}
                                    {/*        !isApproved &&*/}
                                    {/*        <button*/}
                                    {/*            className={"btn focus-ring focus-ring-light"}*/}
                                    {/*            type="button"*/}
                                    {/*            aria-label="Press button to delete job"*/}
                                    {/*            onClick={() => handleDelete(job.jobId)}*/}
                                    {/*        >*/}
                                    {/*            <MdDeleteForever color="#dc3545" size={30}/>*/}
                                    {/*        </button>*/}
                                    {/*    }*/}
                                    {/*</td>*/}
                                </tr>
                            );
                        }
                        // Job doesn't match the status filter, so return null
                        return null;
                    })}
                    </tbody>
                </table>
            </div>
            {/*{*/}
            {/*    jobId &&*/}
            {/*    AssignEmployeesModal()*/}
            {/*}*/}
        </>

    )
}