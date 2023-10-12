import {useContext} from 'react'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.tsx";

export function NavBar() {
    const {
        setIsAuthenticated,
        setEmployeeId,
        setRole,
        role
    } = useContext(AuthContext);
    const navigation = useNavigate();

    async function handleLogout() {
        setIsAuthenticated(false);
        setEmployeeId("");
        setRole("");
        navigation("/");
    }

    return (
        <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-between" id="navbarNavDropdown">
                    <h1 className="my-3 my-md-0">Städafint AB</h1>
                    <div>
                        <ul className="navbar-nav">
                            {role === 'ADMIN' && (
                                <li className="nav-link">
                                    <button className="btn btn-success w-100">
                                        Add employee
                                    </button>
                                </li>
                            )}
                            <li className="nav-link">
                                <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}