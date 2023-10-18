import {NavBar} from "../../components/common/NavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import {getAllJobs} from "../../api/AdminApi.ts";
import {CustomersTable} from "../../components/tables/customers/CustomersTable.tsx";
import {Tab, Tabs} from "react-bootstrap";
import InvoiceTab from "./tabs/InvoiceTab.tsx";
// import EmployeeCleaningsPerType from "../../components/EmployeeCleaningsPerType.tsx";
import {InvoiceForm} from "../../components/forms/InvoiceForm.tsx";
import {PaymentForm} from "../../components/forms/PaymentForm.tsx";
import JobTab from "./tabs/JobTab.tsx";
import EmployeeTab from "./tabs/EmployeeTab.tsx";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";
type Tab = "jobs" | "customers" | "employees" | "wip";

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
    const [key, setKey] = useState<Tab>("jobs");
    const handleSelectedTab = (value: string | null) => value != null && setKey(value as Tab);

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
                onSelect={handleSelectedTab}
                className="mb-3"
                justify={true}
            >
                <Tab eventKey="jobs" title="Jobs">
                    <JobTab
                        jobs={jobs}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        setTriggerUpdateOfJobs={setTriggerUpdateOfJobs}
                        isLoadingJobsData={isLoadingJobsData}
                        setIsLoadingJobsData={setIsLoadingJobsData}
                        />
                </Tab>
                <Tab eventKey="customers" title="Customers">
                    <div className="container">
                        <h2 className="text-md-center fw-bold my-3 text-primary-emphasis">Customers</h2>
                        <div className="my-3">
                            <CustomersTable/>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="employees" title="Employees">
                    <EmployeeTab />
                </Tab>
                <Tab eventKey="invoices" title="Invoices">
                    <InvoiceTab />
                </Tab>
                <Tab eventKey="wip" title="Work-in-progress">
                    {/*<h1 className="text-md-center fw-bold my-3 mx-2">Customers</h1>*/}
                    {/*<div className="container">*/}
                    {/*    <h2 className="text-md-center fw-bold my-3">Jobs per type</h2>*/}
                    {/*    <div className="my-3">*/}
                    {/*        <EmployeeCleaningsPerType/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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