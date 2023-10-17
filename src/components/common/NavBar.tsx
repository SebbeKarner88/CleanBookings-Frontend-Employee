import {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.tsx";

export function NavBar() {
    const {
        setIsAuthenticated,
        setEmployeeId,
        role,
        setRole
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
                    <h1 className="my-3 my-md-0">
                        <Link to="/my-pages" className="link-light">
                            [Replace with logo]
                        </Link>
                    </h1>
                    <div>
                        <ul className="navbar-nav">
                            { role == "ADMIN" &&
                                <li className="nav-link">
                                <div className="dropdown">
                                    <button className="btn btn-success dropdown-toggle w-100"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                    >
                                        Add
                                    </button>
                                    <ul className="dropdown-menu p-3 bg-dark-subtle">
                                        <li className="dropdown-item">
                                            <Link to="/register/new-admin" className="link-light">
                                                New admin
                                            </Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/register/new-cleaner" className="link-light">
                                                New cleaner
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            }
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
    )
}