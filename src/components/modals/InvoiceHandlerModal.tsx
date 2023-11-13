import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

interface InvoiceActionModalProps {
    onShow: boolean;
    onClose: () => void;
    invoiceNumber: string;
    handleAction: () => void;
    actionType: "Update" | "Delete" | undefined;
    isSendingRequest: boolean;
}

const InvoiceActionModal = ({
                                onShow,
                                onClose,
                                invoiceNumber,
                                handleAction,
                                actionType,
                                isSendingRequest
                            }: InvoiceActionModalProps) => {

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
                    {actionType + " invoice with ID: " + invoiceNumber}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-secondary-subtle">
                {
                    actionType === "Delete"
                        ? <p>Are you sure you want to delete this invoice?</p>
                        : <p>Are you sure you want to mark this invoice as paid?</p>
                }
            </Modal.Body>
            <Modal.Footer className="bg-secondary-subtle">
                <Button variant="danger" onClick={onClose}>
                    Cancel
                </Button>
                {
                    <Button
                        variant="primary"
                        onClick={handleAction}
                    >
                        {
                            isSendingRequest
                                ? "Loading..."
                                : actionType === "Delete" ? "Delete" : "Yes"
                        }
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
};

export default InvoiceActionModal;
