import {useContext} from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthContext} from "./context/AuthContext.tsx";
import {LoginView} from "./views/LoginView.tsx";
import AdminPages from "./views/AdminPages.tsx";
import CleanerPages from "./views/CleanerPages.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import GDPREmployeeData from "./components/gdpr-management/GDPREmployeeData.tsx";
import EmployeeCleaningsPerType from "./components/EmployeeCleaningsPerType.tsx";

function App() {
    const {isAuthenticated, role} = useContext(AuthContext);
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginView/>}/>
                    <Route path="/my-pages" element={
                        isAuthenticated && role == "ADMIN"
                            ? <AdminPages/>
                            : isAuthenticated && role == "CLEANER"
                                ? <CleanerPages/>
                                : <LoginView/>}/>
                    <Route path="/gdpr-employee-data" element={<GDPREmployeeData />} />
                    <Route path="/employee-cleanings-per-type" element={<EmployeeCleaningsPerType />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
