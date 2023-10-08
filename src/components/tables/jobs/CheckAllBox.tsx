import {ChangeEvent} from "react";

interface ICheckAllBox {
    id: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

export default function CheckAllBox({ id, onChange, checked }: ICheckAllBox) {
    return (
        <div className="form-check">
            <input
                id={id}
                className="form-check-input"
                type="checkbox"
                onChange={onChange}
                checked={checked}
            />
            <label
                htmlFor={id}
                className="form-check-label mb-1"
            >
                Select all
            </label>
        </div>
    )
}