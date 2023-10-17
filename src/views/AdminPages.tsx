import {NavBar} from "../components/common/NavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {getAllJobs} from "../api/AdminApi.ts";
import {AdminJobsTable} from "../components/tables/jobs/AdminJobsTable.tsx";
import StatusFilter from "../components/tables/jobs/StatusFilter.tsx";
import {CustomersTable} from "../components/tables/customers/CustomersTable.tsx";
import JobsTablePlaceholder from "../components/tables/jobs/JobsTablePlaceholder.tsx";
import {Tab, Tabs} from "react-bootstrap";
import EmployeeCleaningsPerType from "../components/EmployeeCleaningsPerType.tsx";
import {InvoiceForm} from "../components/forms/InvoiceForm.tsx";
import {PaymentForm} from "../components/forms/PaymentForm.tsx";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}

export default function AdminPages() {
    const {employeeId, username} = useContext(AuthContext);
    const [jobs, setJobs] = useState<Job[]>();
    const [selectedStatus, setSelectedStatus] = useState<JobStatus[]>(["OPEN" as JobStatus, "NOT_APPROVED" as JobStatus]);
    const [triggerUpdateOfJobs, setTriggerUpdateOfJobs] = useState<boolean>(false);
    const [isLoadingJobsData, setIsLoadingJobsData] = useState<boolean>(true);
    const [key, setKey] = useState<string>("jobs");

    useEffect(() => {
        fetchJobs().then(data => {
            setJobs(data);
            setIsLoadingJobsData(false);
        });
    }, [triggerUpdateOfJobs]);

    async function fetchJobs() {
        try {
            const response = await getAllJobs(employeeId);
            if (response?.status == 200)
                return response.data;
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    return (
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
             data-bs-theme="dark">
            <NavBar/>
            <p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>
            <h1 className="text-md-center fw-bold my-3 mb-md-5 mx-2">Admin Dashboard</h1>

            <Tabs
                id="admin-dashboard"
                activeKey={key}
                onSelect={value => value != null && setKey(value)}
                className="mb-3"
                justify={true}
            >
                <Tab eventKey="jobs" title="Jobs">
                    <div className="container">
                        <h2 className="text-md-center fw-bold my-3">Current jobs</h2>
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
                </Tab>
                <Tab eventKey="customers" title="Customers">
                    <div className="container">
                        <h2 className="text-md-center fw-bold my-3">Customers</h2>
                        <div className="my-3">
                            <CustomersTable/>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="employees" title="Employees">
                    Tab content for Employees
                </Tab>
                <Tab eventKey="wip" title="Work-in-progress">
                    <h1 className="text-md-center fw-bold my-3 mx-2">Customers</h1>
                    <div className="container">
                        <h2 className="text-md-center fw-bold my-3">Jobs per type</h2>
                        <div className="my-3">
                            <EmployeeCleaningsPerType/>
                        </div>
                    </div>
                    {/*Detta är bara en tillfällig länk för att se hur det såg ut*/}
                    <div className="container">
                        <h2 className="text-md-center fw-bold my-3">Invoices</h2>
                        <div className="my-3">
                            <InvoiceForm/>
                        </div>
                    </div>
                    {/*Detta är bara en tillfällig länk för att se hur det såg ut*/}
                    <div className="container">
                        <h2 className="text-md-center fw-bold my-3">Payments</h2>
                        <div className="my-3">
                            <PaymentForm/>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}