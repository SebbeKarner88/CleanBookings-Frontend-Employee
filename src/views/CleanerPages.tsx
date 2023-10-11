import {NavBar} from "../components/common/NavBar.tsx";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import GDPREmployeeData from "../components/gdpr-management/GDPREmployeeData.tsx";
import EmployeeCleaningsPerType from "../components/EmployeeCleaningsPerType.tsx";

export default function CleanerPages() {
    const {username} = useContext(AuthContext);
    return (
        <div className="container-fluid bg-dark vh-100 text-bg-dark p-0 m-0">
            <NavBar/>
            <p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>
            <h1 className="text-bg-dark text-center">Hey cleaner!</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2>Jobs Per Type</h2>
            </div>
            <EmployeeCleaningsPerType />
            <h2 className="text-bg-dark text-center">Din personliga information</h2>
            {/*<div className="container-fluid vh-100 d-flex justify-content-center align-items-center">*/}
            {/*    <GDPREmployeeData />*/}
            {/*</div>*/}
            <div>
                <GDPREmployeeData />
            </div>
        </div>

    )
}