import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { MdDeleteForever } from "react-icons/md";
import { listAllCustomers } from "../../../api/AdminApi";
import Modal from "../../common/Modal";

interface Customer {
    customerId: string,
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
    const [ customers, setCustomers ] = useState<Customer[]>();

    useEffect(() => {
        fetchCustomers().then(data => setCustomers(data))
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

    return (
        <>
            <div className="table-responsive">
                <table className="table table-responsive table-striped table-hover" data-bs-theme="dark">
                    <thead>
                        <tr>
                            <th scope="col">Customer ID</th>
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
                            // Check if a status filter is provided and if the job's status is included in the filter
                            if (customer !== null) {
                                return (
                                    <tr key={customer.customerId} className="align-middle">
                                        <td>{customer.customerId}</td>
                                        <td>{customer.customerType}</td>
                                        <td>{customer.firstName + ' ' + customer.lastName}</td>
                                        <td>{customer.streetAddress + ' ' + customer.postalCode + ' ' + customer.city}</td>
                                        <td>{customer.emailAddress + ' ' + customer.phoneNumber}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateCustomerModal"
                                                // onClick={() => }
                                            >
                                                Update customer
                                            </button>

                                        </td>
                                        <td>
                                            <button
                                                className="btn focus-ring focus-ring-light"
                                                type="button"
                                                aria-label="Press button to delete customer"
                                                //onClick={() => fetch delete customer}
                                            >
                                                <MdDeleteForever color="#dc3545" size={30} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                            // Job doesn't match the status filter, so return null
                            return null;
                        })}
                    </tbody>
                </table>
            </div>
            {/* {customerId &&
                <Modal
                    id="updateCustomerModal"
                    title={"Select the field you want to update"}
                    body={<SelectEmployees jobId={jobId} setSelectedEmployeeIds={setSelectedEmployeeIds} />}
                    actionButtonLabel="Update customer"
                    handleActionButton={assignSelectedEmployeesToJob}
                />
            } */}
        </>

    )
}