import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

interface IDeleteJobModal {
    onShow: boolean;
    onClose: () => void;
    jobId: string;
    handleDelete: () => void;
}

export default function DeleteJobModal({onShow, onClose, jobId, handleDelete}: IDeleteJobModal) {
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
                <p>Are you sure you want to delete this job?</p>
            </Modal.Body>
            <Modal.Footer className="bg-secondary-subtle">
                <Button variant="danger" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleDelete}
                >
                    Delete job
                </Button>
            </Modal.Footer>
        </Modal>
    )
}