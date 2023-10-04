import {useContext} from 'react'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.tsx";

export function NavBar() {
    const {isAuthenticated, setIsAuthenticated, setEmployeeId, setRole} = useContext(AuthContext);
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
                <a className="navbar-brand" href="#">Städa Fint AB</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">My assignments</a>
                        </li>
                        { isAuthenticated &&
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
        )
}