interface IStatusFilterDropDownLabel {
    label: string,
    onClear: () => void
}

export default function StatusFilterDropDownLabel({ label, onClear }: IStatusFilterDropDownLabel) {
    const labelStyle = "fw-bold text-info-emphasis dropdown-header my-2 my-md-0 fs-5 px-0";

    return (
        <h2 className={labelStyle}>
            {label}
            <button className="btn float-end" type="button" onClick={onClear}>
                Clear filter
            </button>
        </h2>
    )
}