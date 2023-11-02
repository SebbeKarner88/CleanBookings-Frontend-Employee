import api from "./ApiRootUrl.ts";
import {refreshToken} from "./EmployeeApi.ts";

export const getAllAdminInvoices = async (employeeId: string) => {
    try {
        const response = await api.get('/payment/getAllInvoices', {
            params: {
                adminId: employeeId
            },
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
            }
        });
        return {success: true, data: response.data};
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return getAllAdminInvoices(employeeId);
        } else {
            console.error('Error fetching all admin invoices:', error.response.data);
            return {success: false, message: error.response.data};
        }
    }
};

export const markInvoiceAsPaid = async (adminId: string, invoiceId: string) => {
    try {
        await api.put(
            '/payment/markAsPaid',
            null,
            {
                params: {
                    adminId: adminId,
                    invoiceId: invoiceId
                },
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            });
        return {success: true};
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return markInvoiceAsPaid(adminId, invoiceId);
        } else {
            console.error('Error marking invoice as paid:', error.response.data);
            return {success: false, message: error.response.data};
        }
    }
};

export async function deleteInvoice(
    adminId: string,
    invoiceId: string
) {
    try {
        return await api.delete(
            `/payment/${invoiceId}`,
            {
                params: {
                    adminId: adminId
                },
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            }
        );
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return deleteInvoice(adminId, invoiceId);
        } else {
            console.error(error);
        }
    }
}

export async function getAllJobs(employeeId: string) {
    try {
        const response = await api.get(
            "/admin/jobs",
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
                return getAllJobs(employeeId);
        } else {
            console.error(error);
        }
    }
}

export async function getAllAvailableEmployees(
    employeeId: string,
    jobId: string
) {
    try {
        const response = await api.get(
            "/employee",
            {
                params: {
                    employeeId: employeeId,
                    jobId: jobId
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
                return getAllAvailableEmployees(employeeId, jobId);
        } else {
            console.error(error);
        }
    }
}

export async function registerEmployee(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: "ADMIN" | "CLEANER",
    emailAddress: string
) {
    try {
        const response = await api.post(
            "/employee",
            {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                role: role,
                emailAddress: emailAddress
            },
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            }
        );
        if (response?.status == 201)
            return response;
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return registerEmployee(firstName, lastName, phoneNumber, role, emailAddress);
        } else {
            console.error(error);
        }
    }
}

export async function assignEmployees(
    jobId: string,
    employeeId: string,
    selectedEmployeeIds: string[]
) {
    try {
        const response = await api.put(
            "/job/assign-cleaners",
            {
                jobId: jobId,
                adminId: employeeId,
                cleanerIds: selectedEmployeeIds
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
                return assignEmployees(jobId, employeeId, selectedEmployeeIds);
        } else {
            console.error(error);
        }
    }
}

export async function listAllCustomers(employeeId: string) {
    try {
        const response = await api.get(
            "/admin/customers",
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
                return listAllCustomers(employeeId);
        } else {
            console.error(error);
        }
    }
}

export async function listAllAdmins(employeeId: string) {
    try {
        const response = await api.get(
            "/admin/admins",
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
                return listAllAdmins(employeeId);
        } else {
            console.error(error);
        }
    }
}

export async function listAllCleaners(employeeId: string) {
    try {
        const response = await api.get(
            "/admin/cleaners",
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
                return listAllCleaners(employeeId);
        } else {
            console.error(error);
        }
    }
}

export async function deleteCleaner(
    employeeId: string,
    cleanerId: string
) {
    try {
        const response = await api.delete(
            `/admin/cleaner/${cleanerId}`,
            {
                params: {
                    employeeId: employeeId
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
                return deleteCleaner(employeeId, cleanerId);
        } else {
            console.error(error);
        }
    }
}

export async function deleteAdmin(
    employeeId: string,
    adminId: string
) {
    try {
        const response = await api.delete(
            `/admin/admin/${adminId}`,
            {
                params: {
                    employeeId: employeeId
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
                return deleteAdmin(employeeId, adminId);
        } else {
            console.error(error);
        }
    }
}

export async function deleteCustomer(employeeId: string, customerId: string) {
    try {
        const response = await api.delete(
            "/admin/delete",
            {
                params: {
                    adminId: employeeId,
                    customerId: customerId
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
                return deleteCustomer(employeeId, customerId);
        } else {
            console.error(error);
        }
    }
}

export async function deleteJob(
    jobId: string,
    employeeId: string
) {
    try {
        const response = await api.delete(
            `/job/${jobId}`,
            {
                params: {
                    employeeId: employeeId
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
                return deleteJob(jobId, employeeId);
        } else {
            console.error(error);
        }
    }
}

export async function updateCustomer(
    employeeId: string,
    customerId: string,
    firstName?: string,
    lastName?: string,
    streetAddress?: string,
    postalCode?: number,
    city?: string,
    phoneNumber?: string,
    emailAddress?: string
) {
    try {
        const response = await api.put(
            "/admin/updateCustomer",
            {
                adminId: employeeId,
                customerId: customerId,
                firstName: firstName,
                lastName: lastName,
                streetAddress: streetAddress,
                postCode: postalCode,
                city: city,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress
            }, {
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
                return updateCustomer(employeeId, customerId, firstName, lastName, streetAddress, postalCode, city, phoneNumber, emailAddress);
        } else {
            console.error(error);
        }
    }
}

export async function updateEmployee(
    adminId: string,
    employeeId: string,
    firstName?: string,
    lastName?: string,
    emailAddress?: string,
    phoneNumber?: string
) {
    try {
        const response = await api.put(
            "/admin/update-employee",
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
                return updateEmployee(adminId, employeeId, firstName, lastName, emailAddress, phoneNumber);
        } else {
            console.error(error);
        }
    }
}