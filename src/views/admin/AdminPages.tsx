import {NavBar} from "../../components/common/NavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import {getAllJobs} from "../../api/AdminApi.ts";
import {CustomersTable} from "../../components/tables/customers/CustomersTable.tsx";
import {Button, Tab, Tabs} from "react-bootstrap";
import InvoiceTab from "./tabs/InvoiceTab.tsx";
// import EmployeeCleaningsPerType from "../../components/EmployeeCleaningsPerType.tsx";
import JobTab from "./tabs/JobTab.tsx";
import EmployeeTab from "./tabs/EmployeeTab.tsx";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";
type Tab = "jobs" | "customers" | "employees" | "invoices" | "wip";

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
        if (key == "jobs") {
            fetchJobs().then(data => {
                setJobs(data);
                setIsLoadingJobsData(false);
            });
        }
    }, [key, triggerUpdateOfJobs]);

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

            <Link to="/my-pages/employee-settings">
                    <Button size="lg" variant="btn-link" className="btn-dark-purple m-3">
                        <IoSettingsOutline
                            color="var(--beige)"
                            size={30}
                            aria-label="Inställningar" />
                    </Button>
                </Link>

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
                            <CustomersTable isActive={key == "customers"} />
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="employees" title="Employees">
                    <EmployeeTab isActive={key == "employees"} />
                </Tab>
                <Tab eventKey="invoices" title="Invoices">
                    <InvoiceTab isActive={key == "invoices"} />
                </Tab>
                <Tab eventKey="wip" title="Work-in-progress">
                </Tab>
            </Tabs>
        </div>
    )
}