import { ChangeEvent } from "react";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface CheckboxProps {
    label: string;
    value: JobStatus;
    selectedStatus: string[];
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ label, value, selectedStatus, onChange }: CheckboxProps) {
    const checked = selectedStatus.includes(value);
    return (
        <div className="form-check form-check-inline">
            <input
                className={ checked ? "form-check-input bg-info" : "form-check-input"}
                type="checkbox"
                id={value}
                value={value}
                onChange={onChange}
                checked={checked}
            />
            <label className="form-check-label" htmlFor={value}>
                {label}
            </label>
        </div>
    );
}
