import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Checkbox} from "./Checkbox.tsx";
import StatusFilterDropDownLabel from "./StatusFilterDropDownLabel.tsx";
import CheckAllBox from "./CheckAllBox.tsx";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface IStatusFilter {
    selectedStatus: string[],
    setSelectedStatus: Dispatch<SetStateAction<string[]>>
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
    };

    return (
        <div className="dropdown">
            <button className="btn btn-info dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
            >
                Filter
            </button>
            <ul className="dropdown-menu p-4 bg-dark-subtle" style={{minWidth: "76vw", maxWidth: "1300px"}}>
                <div className="row">
                    <div className="col-md-4">
                        <StatusFilterDropDownLabel
                            label="JOB STATUS"
                            onClear={() => setSelectedStatus([])}
                        />
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li>
                            <CheckAllBox
                                id="checkAllStatus"
                                onChange={handleCheckAllStatusesChange}
                                checked={isAllStatusesChecked}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="Unassigned"
                                value="OPEN"
                                selectedStatus={selectedStatus}
                                onChange={handleCheckboxChange}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="Not approved"
                                value="NOT_APPROVED"
                                selectedStatus={selectedStatus}
                                onChange={handleCheckboxChange}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="Waiting for approval"
                                value="WAITING_FOR_APPROVAL"
                                selectedStatus={selectedStatus}
                                onChange={handleCheckboxChange}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="Assigned"
                                value="ASSIGNED"
                                selectedStatus={selectedStatus}
                                onChange={handleCheckboxChange}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="Approved"
                                value="APPROVED"
                                selectedStatus={selectedStatus}
                                onChange={handleCheckboxChange}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="Closed"
                                value="CLOSED"
                                selectedStatus={selectedStatus}
                                onChange={handleCheckboxChange}
                            />
                        </li>
                    </div>
                    <div className="col-md-4">
                        <li>
                            {/* TODO: Add logic for clearing all job types */}
                            <StatusFilterDropDownLabel
                                label="JOB TYPE"
                                onClear={() => console.log("Clearing")}
                            />
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        {/* TODO: Add CheckAllBox-component */}
                        <li>
                            <div className="form-check">
                                <input id="type1" className="form-check-input" type="checkbox"/>
                                <label htmlFor="type1" className="form-check-label">
                                    Type 1
                                </label>
                            </div>
                        </li>
                    </div>
                    <div className="col-md-4">
                        <li>
                            {/* TODO: Add logic for clearing all employees */}
                            <StatusFilterDropDownLabel
                                label="EMPLOYEE"
                                onClear={() => console.log("Clearing")}
                            />
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        {/* TODO: Add CheckAllBox-component */}
                        <li>
                            <div className="form-check">
                                <input id="customer1" className="form-check-input" type="checkbox"/>
                                <label htmlFor="customer1" className="form-check-label">
                                    Employee 1
                                </label>
                            </div>
                        </li>
                    </div>
                </div>
            </ul>
        </div>
    )
}