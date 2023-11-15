import Modal from "react-bootstrap/Modal";
import SelectEmployees from "../tables/jobs/SelectEmployees.tsx";
import {Button, Spinner} from "react-bootstrap";
import {Dispatch, SetStateAction} from "react";

interface IAssignEmployeesModal {
    onShow: boolean;
    onClose: () => void;
    jobId: string;
    timeslot: string;
    setSelectedEmployeeIds: Dispatch<SetStateAction<string[]>>;
    handleAssign: () => void;
    isAssigning: boolean;
}

export default function AssignEmployeesModal({
                                                 onShow,
                                                 onClose,
                                                 jobId,
                                                 timeslot,
                                                 setSelectedEmployeeIds,
                                                 handleAssign,
                                                 isAssigning
                                             }: IAssignEmployeesModal) {
    return (
        <Modal
            show={onShow}
            onHide={onClose}
            fullscreen="md-down"
            scrollable={true}
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
                <SelectEmployees
                    jobId={jobId}
                    timeslot={timeslot}
                    setSelectedEmployeeIds={setSelectedEmployeeIds}
                />
            </Modal.Body>
            <Modal.Footer className="bg-secondary-subtle">
                <Button variant="danger" onClick={onClose}>
                    Cancel
                </Button>
                {
                    isAssigning
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
                            onClick={handleAssign}
                        >
                            Assign job
                        </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}