interface IJobsTable {
    jobs: Job[] | undefined
    status?: "OPEN" | "ASSIGNED" | "APPROVED" | "NOT_APPROVED"
}

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: string,
    jobMessage: string,
    customerId: string,
    employeeIds: string[]
}

export function JobsTable({jobs, status}: IJobsTable) {
    return (
        <div className="table-responsive">
            <table className="table table-responsive table-striped table-hover" data-bs-theme="dark">
                <thead>
                <tr>
                    <th scope="col">Job ID</th>
                    <th scope="col">Type</th>
                    <th scope="col">Message</th>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Employees</th>
                </tr>
                </thead>
                <tbody>
                {
                    status
                        ? jobs?.filter((job: Job) => job.jobStatus == status).map((job: Job) => (
                            <tr key={job.jobId} className="align-middle">
                                <td>{job.jobId}</td>
                                <td>{job.jobType}</td>
                                <td>{job.jobMessage}</td>
                                <td>{job.customerId}</td>
                                <td>
                                    {
                                        job.employeeIds.length == 0 || job.jobStatus == "NOT_APPROVED"
                                            ? <button className="btn btn-primary">Assign employee(s)</button>
                                            : job.employeeIds.join(", ")
                                    }
                                </td>
                            </tr>
                        ))
                        : jobs?.map((job: Job) => (
                            <tr key={job.jobId}>
                                <td>{job.jobId}</td>
                                <td>{job.jobType}</td>
                                <td>{job.jobMessage}</td>
                                <td>{job.customerId}</td>
                                <td>{job.employeeIds.join(", ")}</td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}