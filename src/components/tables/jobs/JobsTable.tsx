type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface IJobsTable {
    jobs: Job[] | undefined,
    statuses?: string[]
}

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: string,
    jobMessage: string,
    customerId: string,
    employeeIds: string[]
}

export function JobsTable({jobs, statuses}: IJobsTable) {

    function getStatusColor(status: string) {
        let className = "fw-semibold ";
        if (status == "OPEN")
            className += "text-warning"
        if (status == "NOT_APPROVED")
            className += "text-danger"
        if (status == "ASSIGNED" || status == "APPROVED" || status == "CLOSED")
            className += "text-success"
        return className;
    }

    return (
        <div className="table-responsive">
            <table className="table table-responsive table-striped table-hover" data-bs-theme="dark">
                <thead>
                <tr>
                    <th scope="col">Job ID</th>
                    <th scope="col">Type</th>
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
                                <td className={getStatusColor(job.jobStatus)}>{job.jobStatus}</td>
                                <td>{job.jobMessage}</td>
                                <td>{job.customerId}</td>
                                <td>
                                    {job.employeeIds.length === 0 || job.jobStatus === "NOT_APPROVED" ? (
                                        <button className="btn btn-primary">Assign employee(s)</button>
                                    ) : (
                                        job.employeeIds.join(", ")
                                    )}
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
    )
}