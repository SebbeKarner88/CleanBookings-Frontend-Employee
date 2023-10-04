import {NavBar} from "../components/common/NavBar.tsx";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";

export default function MyPages() {
    const {employeeId} = useContext(AuthContext);
    return (
        <div className="container-fluid bg-dark vh-100 text-bg-dark p-0 m-0">
            <NavBar/>
            <h1 className="text-bg-dark text-center">{employeeId}</h1>
        </div>

    )
}