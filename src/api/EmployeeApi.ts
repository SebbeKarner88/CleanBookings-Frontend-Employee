import {Dispatch, SetStateAction} from "react";
import api from "./ApiRootUrl.ts";

export async function refreshToken() {
    try {
        const response = await api.post(
            "employee/refresh-token",
            null,
            {
                headers: {
                    "refresh_token": sessionStorage.getItem("refresh_token")
                }
            }
        );
        if (response?.status == 200) {
            console.log("Using refresh token...");
            sessionStorage.setItem("access_token", response.data.accessToken);
            sessionStorage.setItem("refresh_token", response.data.refreshToken);
        }
        return response;
    } catch (error) {
        console.error("Error refreshing token: " + error);
    }
}

export async function loginEmployee(
    email: string,
    password: string,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    setEmployeeId: Dispatch<SetStateAction<string>>,
    setUsername: Dispatch<SetStateAction<string>>,
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
            sessionStorage.setItem("access_token", response.data.accessToken);
            sessionStorage.setItem("refresh_token", response.data.refreshToken);
            sessionStorage.setItem("role", response.data.role);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        const response = await api.post(
            "employee/logout",
            null,
            {
                headers: {
                    "refresh_token": sessionStorage.getItem("refresh_token")
                }
            }
        );
        if (response?.status == 204) {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("refresh_token");
            sessionStorage.removeItem("role");
        }
        return response;
    } catch (error) {
        console.error("Error handling logout call: " + error);
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
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return updatePasswordEmployee(employeeId, currentPassword, newPassword);
        } else {
            console.error(error);
        }
    }
}