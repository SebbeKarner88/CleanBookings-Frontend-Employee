import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { deleteCustomer, listAllCustomers } from "../../../api/AdminApi";
import {useNavigate} from "react-router-dom";

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

    useEffect(() => {
        fetchCustomers().then(data => setCustomers(data))
    }, [updatedList])

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
        if (response?.status === 200)
            setUpdatedList(value => !value)
        else
            alert("This customer has an active booking and can't be removed.")          
        // TODO add modal instead of alert
    }

    const handleUpdate = (customerId: string) => {
        navigation("/update-customer", { state: customerId })
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
                                                onClick={() => handleUpdate(customer.id)}
                                            >
                                                <MdEdit size={30} />
                                            </button>

                                        </td>
                                        <td>
                                            <button
                                                className="btn focus-ring focus-ring-light"
                                                type="button"
                                                aria-label="Press button to delete customer"
                                                onClick={() => removeCustomer(customer.id)}
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
        </>
    )
}