import {Dispatch, SetStateAction} from "react";
import api from "./ApiRootUrl.ts";

export async function loginEmployee(
    email: string,
    password: string,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    setEmployeeId: Dispatch<SetStateAction<string>>,
    setUsername: Dispatch<SetStateAction<string>>,
    setRole: Dispatch<SetStateAction<string>>,
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
            setUsername(response.data.username);
            setRole(response.data.role);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updatePasswordEmployee(
    employeeId: string,
    currentPassword: string,
    newPassword: string
) {
    try {
        const response = await api.put(
            `/employee/updatePassword/${employeeId}`,
            {
                oldPassword: currentPassword,
                newPassword: newPassword
            }
        );
        if (response.status == 200)
            return response;
    } catch (error) {
        return error;
    }
}