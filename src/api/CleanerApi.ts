import api from "./ApiRootUrl.ts";


export async function getAllJobsCleaner(employeeId: string) {
    try {
        const response = await api.get(
            "/cleaner/jobs",
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

