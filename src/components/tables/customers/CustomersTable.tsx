import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { deleteCustomer, listAllCustomers } from "../../../api/AdminApi";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export interface Customer {
    id: string,
    firstName: string,
    lastName: string,
    customerType: string,
    streetAddress: string,
    postalCode: number,
    city: string,
    phoneNumber: string,
    emailAddress: string
}

export function CustomersTable() {
    const { employeeId } = useContext(AuthContext)
    const navigation = useNavigate();
    const [ customers, setCustomers ] = useState<Customer[]>([])
    const [ updatedList, setUpdatedList ] = useState(false)
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ customerId, setCustomerId ] = useState("")
    const handleCloseModal = () => setModalVisible(false)

    useEffect(() => {
        fetchCustomers().then(data => setCustomers(data))
    }, [ updatedList ])

    async function fetchCustomers() {
        try {
            const response = await listAllCustomers(employeeId)
            if (response?.status == 200)
                return response.data
        } catch (error) {
            console.error(error)
        }

        return []
    }

    async function removeCustomer(customerId: string) {
        const response = await deleteCustomer(employeeId, customerId)
        if (response?.status === 200) {
            setUpdatedList(value => !value)
            handleCloseModal()
        } else {
            alert("This customer has an active booking and can't be removed.")
        }
    }

    const handleUpdate = (values: object) => {
        navigation("/update-customer", { state: values })
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table table-responsive table-striped table-hover" data-bs-theme="dark">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Contact</th>
                            <th className="text-center" scope="col">Update</th>
                            <th className="text-center" scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers?.map((customer: Customer) => {
                            return (
                                <tr key={customer.id} className="align-middle">
                                    <td>{customer.customerType}</td>
                                    <td>{customer.firstName + ' ' + customer.lastName}</td>
                                    <td>{customer.streetAddress + ' ' + customer.postalCode + ' ' + customer.city}</td>
                                    <td>{customer.emailAddress + ' ' + customer.phoneNumber}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn focus-ring focus-ring-light"
                                            onClick={() => {
                                                const values = { customerId: customer.id, firstName: customer.firstName,
                                                lastName: customer.lastName, customerType: customer.customerType,
                                                streetAddress: customer.streetAddress, postalCode: customer.postalCode,
                                                city: customer.city, phoneNumber: customer.phoneNumber, emailAddress: customer.emailAddress}
                                                handleUpdate(values)
                                            }}
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
                                                setCustomerId(customer.id)
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
                        {"Customer ID: " + customerId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-secondary-subtle">
                    <p>Are you sure you want to delete this customer?</p>
                </Modal.Body>
                <Modal.Footer className="bg-secondary-subtle">
                    <Button variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => removeCustomer(customerId)}
                    >
                        Delete customer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}