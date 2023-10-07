import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Checkbox} from "./Checkbox.tsx";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface IStatusFilter {
    selectedStatus: string[],
    setSelectedStatus: Dispatch<SetStateAction<string[]>>
}

export default function StatusFilter({selectedStatus, setSelectedStatus}: IStatusFilter) {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as JobStatus;
        setSelectedStatus(prevSelectedStatus => {
            if (event.target.checked)
                return [...prevSelectedStatus, value];
            else
                return prevSelectedStatus.filter(status => status !== value);
        });
    }

    return (
        <div className="container">
            <h2 className="h2 my-3 text-info fw-semibold">Filter by job status</h2>
            <div className="d-flex flex-column flex-md-row justify-content-md-between my-3 border border-2 border-dark-subtle p-3">
                <Checkbox
                    label="Unassigned"
                    value="OPEN"
                    selectedStatus={selectedStatus}
                    onChange={handleCheckboxChange}
                />
                <Checkbox
                    label="Not approved"
                    value="NOT_APPROVED"
                    selectedStatus={selectedStatus}
                    onChange={handleCheckboxChange}
                />
                <Checkbox
                    label="Waiting for approval"
                    value="WAITING_FOR_APPROVAL"
                    selectedStatus={selectedStatus}
                    onChange={handleCheckboxChange}
                />
                <Checkbox
                    label="Assigned"
                    value="ASSIGNED"
                    selectedStatus={selectedStatus}
                    onChange={handleCheckboxChange}
                />
                <Checkbox
                    label="Approved"
                    value="APPROVED"
                    selectedStatus={selectedStatus}
                    onChange={handleCheckboxChange}
                />
                <Checkbox
                    label="Closed"
                    value="CLOSED"
                    selectedStatus={selectedStatus}
                    onChange={handleCheckboxChange}
                />
            </div>
        </div>
    )
}