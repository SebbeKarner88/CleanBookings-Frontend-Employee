import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.tsx";
import {getAllAvailableEmployees} from "../../../api/AdminApi.ts";

interface ISelectEmployees {
    jobId: string;
    setSelectedEmployeeIds: Dispatch<SetStateAction<string[]>>
}

interface Employee {
    id: string;
    name: string
}

export default function SelectEmployees({ jobId, setSelectedEmployeeIds }: ISelectEmployees) {
    const { employeeId } = useContext(AuthContext);
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        fetchAllAvailableEmployees().then(data => setEmployees(data));
    }, [jobId]);

    async function fetchAllAvailableEmployees() {
        const response = await getAllAvailableEmployees(employeeId, jobId);
        if (response?.status == 200)
            return response.data;
    }

    return (
        <>
        <label className="form-label fw-bold text-primary-emphasis">Select employee(s) to assign</label>
        <select
            className="form-select"
            multiple
            aria-label="Select employee(s) to assign"
            onChange={event => setSelectedEmployeeIds(Array.from(
                event.target.selectedOptions, option => option.value
            ))}
        >
            {
                employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                        {employee.name}
                    </option>
                ))
            }
        </select>
        </>
    )
}