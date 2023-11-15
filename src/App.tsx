import { useContext } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.tsx";
import { LoginView } from "./views/LoginView.tsx";
import AdminPages from "./views/admin/AdminPages.tsx";
import CleanerPages from "./views/CleanerPages.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import GDPREmployeeData from "./components/gdpr-management/GDPREmployeeData.tsx";
import { FormUpdateCustomer } from "./components/forms/FormUpdateCustomer.tsx";
import RegisterAdminView from "./views/register/RegisterAdminView.tsx";
import RegisterCleanerView from "./views/register/RegisterCleanerView.tsx";
import { FormUpdateEmployee } from "./components/forms/FormUpdateEmployee.tsx";
import EmployeeSettingsView from "./views/EmployeeSettingsView.tsx";
import EditEmployeeDataView from "./components/EditEmployeeDataView.tsx";

function App() {
    const { isAuthenticated } = useContext(AuthContext);
    const role = sessionStorage.getItem("role");
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/my-pages" element={
                        isAuthenticated && role == "client_admin"
                            ? <AdminPages />
                            : isAuthenticated && role == "client_cleaner"
                                ? <CleanerPages />
                                : <LoginView />} />
                    <Route path="/my-pages/employee-settings" element={<EmployeeSettingsView />} />
                    <Route path="/update-employee" element={<EditEmployeeDataView />} />
                    <Route path="/gdpr-employee-data" element={<GDPREmployeeData />} />
                    {
                        isAuthenticated && role == "client_admin" &&
                        <>
                            <Route path="/update-customer" element={<FormUpdateCustomer />} />
                            <Route path="/update-employee" element={<FormUpdateEmployee />} />
                            <Route path="/register/new-admin" element={<RegisterAdminView />} />
                            <Route path="/register/new-cleaner" element={<RegisterCleanerView />} />
                        </>
                    }
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
