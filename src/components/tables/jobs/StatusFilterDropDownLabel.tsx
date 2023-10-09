interface IStatusFilterDropDownLabel {
    label: string,
    onClear: () => void
}

export default function StatusFilterDropDownLabel({ label, onClear }: IStatusFilterDropDownLabel) {
    const labelStyle = "fw-bold text-info-emphasis dropdown-header my-2 my-md-0 fs-5 px-0";

    return (
        <h2 className={labelStyle}>
            {label}
            <button
                className="btn float-end text-danger-emphasis focus-ring focus-ring-light"
                type="button"
                onClick={onClear}
                aria-label={"Press button to clear filter of " + label}
            >
                Clear filter
            </button>
        </h2>
    )
}