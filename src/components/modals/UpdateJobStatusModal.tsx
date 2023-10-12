import Modal from "react-bootstrap/Modal";
import {Button, Spinner} from "react-bootstrap";

interface IUpdateJobStatusModal {
    onShow: boolean;
    onClose: () => void;
    jobId: string;
    handleStatusUpdate: () => void;
    isUpdating: boolean
}

export default function UpdateJobStatusModal({onShow, onClose, jobId, handleStatusUpdate, isUpdating}: IUpdateJobStatusModal) {
    return (
        <Modal
            show={onShow}
            onHide={onClose}
            fullscreen="md-down"
        >
            <Modal.Header
                className="bg-secondary-subtle"
                closeButton
            >
                <Modal.Title className="fs-6 fw-bold">
                    {"Job ID: " + jobId}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-secondary-subtle">
                <p>Are you sure you want to mark this job as done?</p>
            </Modal.Body>
            <Modal.Footer className="bg-secondary-subtle">
                <Button variant="danger" onClick={onClose}>
                    Cancel
                </Button>
                {
                    isUpdating
                        ? <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                aria-label={"Sending request..."}
                            />
                        </Button>
                        : <Button
                            variant="primary"
                            onClick={handleStatusUpdate}
                        >
                            Update status
                        </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}