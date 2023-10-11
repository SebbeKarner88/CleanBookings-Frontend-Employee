import api from "./ApiRootUrl.ts";
import { Customer } from "../components/tables/customers/CustomersTable.tsx";

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
    customer: Customer[]
    ) {
    try {
        const response = await api.put(
            "/admin/updateCustomer",
            {
                    adminId: employeeId,
                    customerId: customerId,
                    firstname: customer,
                    lastName: customer,
                    customerType: customer,
                    streetAdress: customer,
                    postalCode: customer,
                    city: customer,
                    phoneNumber: customer,
                    emailAdress: customer
            });
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}