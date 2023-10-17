import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import {listAllAdmins} from "../../../api/AdminApi";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

interface Admin {
    id: string,
    firstName: string,
    lastName: string,
    emailAddress: string
    phoneNumber: string,
}

export function AdminsTable() {
    const { employeeId } = useContext(AuthContext)
    const navigation = useNavigate();
    const [ admins, setAdmins ] = useState<Admin[]>([])
    const [ updatedList, setUpdatedList ] = useState(false)
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ adminId, setAdminId ] = useState("")
    const handleCloseModal = () => setModalVisible(false)

    useEffect(() => {
        fetchAdmins().then(data => setAdmins(data))
    }, [updatedList])

    async function fetchAdmins() {
        try {
            const response = await listAllAdmins(employeeId);
            if (response?.status == 200)
                return response.data;
            else
                return [];
        } catch (error) {
            console.error(error)
        }
    }

    // TODO: Implement logic for handling update and delete of admins...

    return (
        <>
            <div className="table-responsive">
                <table className="table table-responsive table-striped table-hover" data-bs-theme="dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Email address</th>
                            <th scope="col">Phone number</th>
                            <th className="text-center" scope="col">Update</th>
                            <th className="text-center" scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins?.map((admin: Admin) => {
                            return (
                                <tr key={admin.id} className="align-middle">
                                    <td>{admin.id}</td>
                                    <td>{admin.firstName }</td>
                                    <td>{admin.lastName}</td>
                                    <td>{admin.emailAddress}</td>
                                    <td>{admin.phoneNumber}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn focus-ring focus-ring-light"
                                            // onClick={}
                                        >
                                            <MdEdit size={30} />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn focus-ring focus-ring-light"
                                            type="button"
                                            aria-label="Press button to delete customer"
                                            onClick={() => {
                                                setAdminId(admin.id)
                                                setModalVisible(true)
                                            }}
                                        >
                                            <MdDeleteForever color="#dc3545" size={30} />
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
                        {"Admin ID: " + adminId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-secondary-subtle">
                    <p>Are you sure you want to delete this admin?</p>
                </Modal.Body>
                <Modal.Footer className="bg-secondary-subtle">
                    <Button variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        // onClick={}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}