import React, { useEffect, useState, useContext } from 'react';
import {markInvoiceAsPaid} from "../../../api/AdminApi.ts";
import InvoiceActionModal from "../../modals/InvoiceHandlerModal";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext.tsx";


interface Invoice {
    customer: {
        firstName: string;
        lastName: string;
    };
    paymentEntity: {
        invoiceNumber: string;
        price: number;
        issueDate: string;
        dueDate: string;
        paymentStatus: string;
    };
    message: string;
}

interface Props {
    employeeId: string;
}

type ActionType = 'UPDATE' | 'DELETE' | null;

export const InvoiceTable: React.FC<Props> = ({ employeeId }) => {
    const { employeeId: contextEmployeeId } = useContext(AuthContext);    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionType, setActionType] = useState<ActionType | null>(null);

    useEffect(() => {
        async function fetchInvoices() {
            setIsLoading(true);
            try {
                const response = await (employeeId);
                if (response.data) {
                    setInvoices(response.data);
                }
            } catch (error) {
                console.error("Error fetching invoices:", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchInvoices();
    }, [employeeId]);

    const handleActionButtonClick = (invoice: Invoice, type: ActionType) => {
        setSelectedInvoice(invoice);
        setActionType(type);
        setShowActionModal(true);
    };

    const handleStatusUpdate = async () => {
        if (!selectedInvoice) return;

        try {
            const adminId = contextEmployeeId;  // or wherever you get the adminId from
            const response = await markInvoiceAsPaid(adminId, selectedInvoice.paymentEntity.invoiceNumber);

            if (response.success) {
                // Update the list of invoices or change the status of the specific invoice
                setInvoices(invoices.map(invoice =>
                    invoice.paymentEntity.invoiceNumber === selectedInvoice.paymentEntity.invoiceNumber
                        ? { ...invoice, paymentEntity: { ...invoice.paymentEntity, paymentStatus: "PAID" } }
                        : invoice
                ));
            } else {
                // Handle error
                console.error("Error updating payment status:", response.message);
            }
        } catch (error) {
            console.error("Error updating payment status:", error);
        }
    };

    const handleDelete = async () => {
        if (!selectedInvoice) return;

        try {
            const response = await deleteInvoice(selectedInvoice.paymentEntity.invoiceNumber);

            if (response.success) {
                // Ta bort fakturan från listan
                setInvoices(invoices.filter(invoice => invoice.paymentEntity.invoiceNumber !== selectedInvoice.paymentEntity.invoiceNumber));
            } else {
                // Hantera fel
                console.error("Error deleting invoice:", response.message);
            }
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <div className="container">
            <h2>All Invoices</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Invoice Number</th>
                    <th>Description</th>
                    <th>Total Amount</th>
                    <th>Invoice Date</th>
                    <th>Due Date</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice.paymentEntity.invoiceNumber}>
                        <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                        <td>{invoice.paymentEntity.invoiceNumber}</td>
                        <td>{invoice.message}</td>
                        <td>{invoice.paymentEntity.price}</td>
                        <td>{invoice.paymentEntity.issueDate}</td>
                        <td>{invoice.paymentEntity.dueDate}</td>
                        <td>{invoice.paymentEntity.paymentStatus}</td>
                        <td>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleActionButtonClick(invoice, 'UPDATE')}>
                                <MdEdit color="#007bff" size={20} /> Update Payment Status
                            </button>
                            <button
                                className="btn btn-danger ml-2"
                                onClick={() => handleActionButtonClick(invoice, 'DELETE')}>
                                <MdDeleteForever color="#dc3545" size={20} /> Delete Invoice
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedInvoice &&
                <InvoiceActionModal
                    onShow={showActionModal}
                    onClose={() => setShowActionModal(false)}
                    invoiceNumber={selectedInvoice.paymentEntity.invoiceNumber}
                    handleAction={actionType === 'UPDATE' ? handleStatusUpdate : handleDelete}
                    actionType={actionType}
                    isProcessing={false}
                />}
        </div>
    );
}
