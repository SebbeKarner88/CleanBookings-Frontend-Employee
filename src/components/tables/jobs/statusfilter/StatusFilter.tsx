import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Checkbox} from "../../../forms/input/Checkbox.tsx";
import StatusFilterDropDownLabel from "./StatusFilterDropDownLabel.tsx";
import CheckAllBox from "../../../forms/input/CheckAllBox.tsx";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface IStatusFilter {
    selectedStatus: JobStatus[],
    setSelectedStatus: Dispatch<SetStateAction<JobStatus[]>>
}

export default function StatusFilter({selectedStatus, setSelectedStatus}: IStatusFilter) {
    const isAllStatusesChecked = selectedStatus.length === 6;

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as JobStatus;
        setSelectedStatus(prevSelectedStatus => {
            if (event.target.checked)
                return [...prevSelectedStatus, value];
            else
                return prevSelectedStatus.filter(status => status !== value);
        });
    }

    const handleCheckAllStatusesChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked)
            setSelectedStatus([
                "OPEN",
                "ASSIGNED",
                "WAITING_FOR_APPROVAL",
                "NOT_APPROVED",
                "APPROVED",
                "CLOSED",
            ]);
        else
            setSelectedStatus([]);
    }

    const handleClearAllFilter = () => {
        setSelectedStatus([]);
    //     TODO: Implement logic for resetting the rest of the filters...
    }

    return (
            <div className="dropdown">
                <button className="btn btn-info dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                >
                    Filter
                </button>
                <button
                    className="btn text-danger-emphasis mx-3 focus-ring focus-ring-light"
                    type="button"
                    onClick={handleClearAllFilter}
                    aria-label={"Press button to clear all filter"}
                >
                    Clear filter
                </button>
                <ul className="dropdown-menu p-3 p-md-4 bg-dark-subtle" style={{width: "270px"}}>
                    <div className="row">
                        <div className="col-md-4">
                            <StatusFilterDropDownLabel
                                label="JOB STATUS"
                                onClear={() => setSelectedStatus([])}
                            />
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="dropdown-item">
                                <CheckAllBox
                                    id="checkAllStatus"
                                    onChange={handleCheckAllStatusesChange}
                                    checked={isAllStatusesChecked}
                                />
                            </li>
                            <li className="dropdown-item">
                                <Checkbox
                                    label="Unassigned"
                                    value="OPEN"
                                    selectedStatus={selectedStatus}
                                    onChange={handleCheckboxChange}
                                />
                            </li>
                            <li className="dropdown-item">
                                <Checkbox
                                    label="Not approved"
                                    value="NOT_APPROVED"
                                    selectedStatus={selectedStatus}
                                    onChange={handleCheckboxChange}
                                />
                            </li>
                            <li className="dropdown-item">
                                <Checkbox
                                    label="Waiting for approval"
                                    value="WAITING_FOR_APPROVAL"
                                    selectedStatus={selectedStatus}
                                    onChange={handleCheckboxChange}
                                />
                            </li>
                            <li className="dropdown-item">
                                <Checkbox
                                    label="Assigned"
                                    value="ASSIGNED"
                                    selectedStatus={selectedStatus}
                                    onChange={handleCheckboxChange}
                                />
                            </li>
                            <li className="dropdown-item">
                                <Checkbox
                                    label="Approved"
                                    value="APPROVED"
                                    selectedStatus={selectedStatus}
                                    onChange={handleCheckboxChange}
                                />
                            </li>
                            <li className="dropdown-item">
                                <Checkbox
                                    label="Closed"
                                    value="CLOSED"
                                    selectedStatus={selectedStatus}
                                    onChange={handleCheckboxChange}
                                />
                            </li>
                        </div>
                    </div>
                </ul>
            </div>
    )
}