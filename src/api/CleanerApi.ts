import api from "./ApiRootUrl.ts";
import {refreshToken} from "./EmployeeApi.ts";


export async function getJobsByCleanerId(employeeId: string) {
    try {
        const response = await api.get(
            "/cleaner/jobs",
            {
                params: {
                    employeeId: employeeId,
                },
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return getJobsByCleanerId(employeeId);
        } else {
            console.error(error);
        }
    }
}

export async function executedCleaningRequest(
    employeeId: string,
    jobId: string
) {
    try {
        const response = await api.put(
            "/job/executed-cleaning",
            {
                userId: employeeId,
                jobId: jobId

            }, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            });
        if (response.status == 200)
            return response;
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return executedCleaningRequest(employeeId, jobId);
        } else {
            console.error(error);
        }
    }
}

export async function updateEmployeeCleaner(
    adminId: string,
    employeeId: string,
    firstName?: string,
    lastName?: string,
    emailAddress?: string,
    phoneNumber?: string
) {
    try {
        const response = await api.put(
            "/cleaner/update-employee",
            {
                adminId: adminId,
                employeeId: employeeId,
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                phoneNumber: phoneNumber
            },
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return updateEmployeeCleaner(adminId, employeeId, firstName, lastName, emailAddress, phoneNumber);
        } else {
            console.error(error);
        }
    }
}

