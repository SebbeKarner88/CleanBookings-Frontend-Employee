import {useContext} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthContext} from "./context/AuthContext.tsx";
import {LoginView} from "./views/LoginView.tsx";
import AdminPages from "./views/AdminPages.tsx";
import CleanerPages from "./views/CleanerPages.tsx";

function App() {
    const {isAuthenticated, role} = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginView/>}/>
                <Route path="/my-pages" element={
                    isAuthenticated && role == "ADMIN"
                        ? <AdminPages/>
                        : isAuthenticated && role == "CLEANER"
                            ? <CleanerPages/>
                            : <LoginView/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
