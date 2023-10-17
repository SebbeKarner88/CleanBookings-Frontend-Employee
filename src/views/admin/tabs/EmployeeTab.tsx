import {AdminsTable} from "../../../components/tables/employees/AdminsTable.tsx";
import {CleanersTable} from "../../../components/tables/employees/CleanersTable.tsx";

export default function EmployeeTab() {
    return (
        <div className="container">
            <h2 className="text-md-center fw-bold my-3 text-primary-emphasis">Employees</h2>

            <h3 className="fw-bold my-3">Admins</h3>
            <div className="my-3">
                <AdminsTable/>
            </div>

            <h3 className="fw-bold my-3">Cleaners</h3>
            <div className="my-3">
                <CleanersTable/>
            </div>
        </div>
    )
}