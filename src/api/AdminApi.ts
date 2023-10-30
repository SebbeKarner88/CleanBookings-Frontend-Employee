import api from "./ApiRootUrl.ts";

export const getAllAdminInvoices = async (employeeId: string) => {
    try {
        const response = await api.get('/payment/getAllInvoices', {
            params: {adminId: employeeId}
        });
        return {success: true, data: response.data};
    } catch (error: any) {
        console.error('Error fetching all admin invoices:', error.response.data);
        return {success: false, message: error.response.data};
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
                }
            });
        return {success: true};
    } catch (error: any) {
        console.error('Error marking invoice as paid:', error.response.data);
        return {success: false, message: error.response.data};
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
                }
            }
        );
    } catch (error) {
        console.error(error);
    }
}

export async function getAllJobs(employeeId: string) {
    try {
        const response = await api.get(
            "/admin/jobs",
            {
                params: {
                    employeeId: employeeId,
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
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
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
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
            }
        );
        if (response?.status == 201)
            return response;
    } catch (error) {
        console.error(error);
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
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function listAllCustomers(employeeId: string) {
    try {
        const response = await api.get(
            "/admin/customers",
            {
                params: {
                    employeeId: employeeId,
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function listAllAdmins(employeeId: string) {
    try {
        const response = await api.get(
            "/admin/admins",
            {
                params: {
                    employeeId: employeeId,
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function listAllCleaners(employeeId: string) {
    try {
        const response = await api.get(
            "/admin/cleaners",
            {
                params: {
                    employeeId: employeeId,
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
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
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
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
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
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
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
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
                }
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
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
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
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
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}