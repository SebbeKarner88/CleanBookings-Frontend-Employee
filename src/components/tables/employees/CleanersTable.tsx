import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {MdDeleteForever, MdEdit} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Modal} from "react-bootstrap";
import {deleteCleaner, listAllCleaners} from "../../../api/AdminApi.ts";

interface Cleaner {
    id: string,
    role: "CLEANER",
    firstName: string,
    lastName: string,
    emailAddress: string
    phoneNumber: string,
}

interface ICleanersTable {
    isActive: boolean;
}

export function CleanersTable({isActive}: ICleanersTable) {
    const {employeeId} = useContext(AuthContext)
    const navigation = useNavigate();
    const [cleaners, setCleaners] = useState<Cleaner[]>([])
    const [updatedList, setUpdatedList] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [cleanerId, setCleanerId] = useState("")
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
    const handleCloseModal = () => setModalVisible(false)

    useEffect(() => {
        if (isActive)
            fetchCleaners().then(data => setCleaners(data));
    }, [isActive, updatedList])

    async function fetchCleaners() {
        try {
            const response = await listAllCleaners(employeeId);
            if (response?.status == 200)
                return response.data;
            else
                return [];
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdate = (values: Cleaner) => {
        navigation(
            "/update-employee",
            {state: values},
        );
    }

    async function handleDelete() {
        const response = await deleteCleaner(employeeId, cleanerId);
        if (response?.status == 200)
            setUpdatedList(value => !value);
        else
            setShowErrorAlert(true);
        handleCloseModal();
    }

    return (
        <>
            {
                showErrorAlert &&
                <Alert variant="danger" dismissible={true} onClose={() => setShowErrorAlert(false)}>
                    <Alert.Heading>
                        Oops! You've got an error...
                    </Alert.Heading>
                    Could not delete cleaner with ID "{cleanerId}" due to jobs in progress.
                </Alert>
            }
            <div className="table-responsive">
                <table className="table table-responsive table-striped table-hover" data-bs-theme="dark">
                    <thead>
                    <tr>
                        <th scope="col">Cleaner ID</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Email address</th>
                        <th scope="col">Phone number</th>
                        <th className="text-center" scope="col">Update</th>
                        <th className="text-center" scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cleaners?.map((cleaner: Cleaner) => {
                        return (
                            <tr key={cleaner.id} className="align-middle">
                                <td>{cleaner.id}</td>
                                <td>{cleaner.firstName}</td>
                                <td>{cleaner.lastName}</td>
                                <td>{cleaner.emailAddress}</td>
                                <td>{cleaner.phoneNumber}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn focus-ring focus-ring-light"
                                        onClick={() => handleUpdate({...cleaner, role: "CLEANER"})}
                                    >
                                        <MdEdit size={30}/>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn focus-ring focus-ring-light"
                                        type="button"
                                        aria-label="Press button to delete cleaner"
                                        onClick={() => {
                                            setCleanerId(cleaner.id)
                                            setModalVisible(true)
                                        }}
                                    >
                                        <MdDeleteForever color="#dc3545" size={30}/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <Modal
                show={modalVisible}
                onHide={handleCloseModal}
                fullscreen="md-down"
            >
                <Modal.Header
                    className="bg-secondary-subtle"
                    closeButton
                >
                    <Modal.Title className="fs-6 fw-bold">
                        {"Cleaner ID: " + cleanerId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-secondary-subtle">
                    <p>Are you sure you want to delete this cleaner?</p>
                </Modal.Body>
                <Modal.Footer className="bg-secondary-subtle">
                    <Button variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}