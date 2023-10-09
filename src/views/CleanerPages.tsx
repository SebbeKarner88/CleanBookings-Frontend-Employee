import {NavBar} from "../components/common/NavBar.tsx";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import GDPREmployeeData from "../components/gdpr-management/GDPREmployeeData.tsx";

export default function CleanerPages() {
    const {employeeId} = useContext(AuthContext);
    return (
        <div className="container-fluid bg-dark vh-100 text-bg-dark p-0 m-0">
            <NavBar/>
            <h1 className="text-bg-dark text-center">Hey cleaner!</h1>
            <h2 className="text-bg-dark text-center">{employeeId}</h2>
            <h2 className="text-bg-dark text-center">Din personliga information</h2>
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
                <GDPREmployeeData />
            </div>
        </div>

    )
}