import {ReactNode} from "react";

interface IModal {
    id: string;
    title: string;
    body: ReactNode;
    actionButtonLabel: string;
    handleActionButton: () => void;
}

export default function Modal({id, title, body, actionButtonLabel, handleActionButton}: IModal) {
    return (
        <div className="modal fade" id={id} tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg mt-md-5 modal-dialog-scrollable modal-fullscreen-md-down">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            aria-label="Press button to close modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleActionButton}
                        >
                            {actionButtonLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}