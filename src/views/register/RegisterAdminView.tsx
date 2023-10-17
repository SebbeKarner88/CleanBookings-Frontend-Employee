import {NavBar} from "../../components/common/NavBar.tsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import FormRegisterEmployee from "../../components/forms/FormRegisterEmployee.tsx";

export default function RegisterAdminView() {
    const {username} = useContext(AuthContext);

    return (
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
             data-bs-theme="dark">
            <NavBar/>
            <p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>
            <div className="container">
                <FormRegisterEmployee role="ADMIN" />
            </div>
        </div>
    )
}