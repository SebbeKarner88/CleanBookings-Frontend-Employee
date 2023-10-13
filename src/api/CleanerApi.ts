import api from "./ApiRootUrl.ts";


export async function getJobsByCleanerId(employeeId: string) {
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

            });
        if (response.status == 200)
            return response;
    } catch (error) {
        console.error(error);
    }
}

