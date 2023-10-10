import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { deleteCustomer, listAllCustomers } from "../../../api/AdminApi";
import Modal from "../../common/Modal";

interface Customer {
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
    const [ customers, setCustomers ] = useState<Customer[]>([]);

    useEffect(() => {
        fetchCustomers().then(data => setCustomers(data))

        const interval = setInterval(() => {
            fetchCustomers()
        }, 1000)

        return () => clearInterval(interval)
    }, [])

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

    const handleDelete = (employeeId: string, customerId: string) => {
        // TODO add warning if customer has a booked cleaning job
        setCustomers(customers.filter(t => t.id !== customerId))  // <-- this deletes customers from frontend even if they're not deleted from backend! fix
        deleteCustomer(employeeId, customerId)
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
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateCustomerModal"
                                            // onClick={() => }
                                            >
                                                <MdEdit size={30} />
                                            </button>

                                        </td>
                                        <td>
                                            <button
                                                className="btn focus-ring focus-ring-light"
                                                type="button"
                                                aria-label="Press button to delete customer"
                                                onClick={() => handleDelete(employeeId, customer.id)}
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

{/*             <Modal
                id="updateCustomerModal"
                title={"Select the field you want to update"}
                body={<SelectEmployees jobId={jobId} setSelectedEmployeeIds={setSelectedEmployeeIds} />}
                actionButtonLabel="Update customer"
                handleActionButton={assignSelectedEmployeesToJob}
            /> */}

        </>

    )
}