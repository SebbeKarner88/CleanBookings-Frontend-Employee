import {AdminTable} from "../../../components/tables/employees/AdminTable.tsx";

export default function EmployeeTab() {
    return (
        <div className="container">
            <h2 className="text-md-center fw-bold my-3 text-primary-emphasis">Employees</h2>

            <h3 className="fw-bold my-3">Admins</h3>
            <div className="my-3">
                <AdminTable/>
            </div>

            <h3 className="fw-bold my-3">Cleaners</h3>
            <div className="my-3">
            {/*    Insert table for cleaners */}
            </div>
        </div>
    )
}