import {FormLogin} from "../components/forms/FormLogin.tsx";

export function LoginView() {
    return (
        <div className="container-fluid bg-dark vh-100 text-bg-dark p-0 m-0">
            <h1 className="p-3">Städa Fint AB</h1>
            <div className="container mt-5" style={{maxWidth: "500px"}}>
                <FormLogin/>
            </div>
        </div>
    )
}