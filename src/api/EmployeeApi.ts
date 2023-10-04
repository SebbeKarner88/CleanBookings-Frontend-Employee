import React from "react";
import api from "./ApiRootUrl.ts";

export async function loginEmployee(
    email: string,
    password: string,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setEmployeeId: React.Dispatch<React.SetStateAction<string>>,
    setRole: React.Dispatch<React.SetStateAction<string>>,
) {
    try {
        const response = await api.post(
            "employee/login",
            {
                email: email,
                password: password
            }
        );
        if (response.status == 200) {
            setIsAuthenticated(true);
            setEmployeeId(response.data.employeeId);
            setRole(response.data.role);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}