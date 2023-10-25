import { useEffect, useState, useContext } from 'react';
import { markInvoiceAsPaid } from "../../../api/AdminApi";
import InvoiceActionModal from "../../modals/InvoiceHandlerModal";
import { MdEdit } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";
import { getAllAdminInvoices } from "../../../api/AdminApi";

interface PaymentStatus {
    INVOICED: "INVOICED",
    PAID: "PAID",
    OVERDUE: "OVERDUE"
}

interface Invoice {
    id: number;
    issueDate: Date;
    dueDate: Date;
    jobId: string;
    status: keyof PaymentStatus;
    price: number;
}

export const InvoiceTable: React.FC = () => {
    const { employeeId } = useContext(AuthContext);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
    const [showActionModal, setShowActionModal] = useState(false);

    useEffect(() => {
        async function fetchInvoices() {
            const { success, data, message } = await getAllAdminInvoices(employeeId);
            if (success) {
                setInvoices(data);
            } else {
                console.error('Error fetching invoices:', message);
            }
            setIsLoading(false);
        }
        fetchInvoices();
    }, [employeeId]);

    const handleMarkAsPaid = async () => {
        if (selectedInvoiceId) {
            const { success, message } = await markInvoiceAsPaid(employeeId, selectedInvoiceId.toString());
            if (success) {
                setInvoices(prev => prev.map(invoice => invoice.id === selectedInvoiceId ? { ...invoice, status: "PAID" } : invoice));
            } else {
                console.error('Error marking invoice as paid:', message);
            }
        }
    }

    return (
        <div>
            <h2>Invoices</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Job ID</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.issueDate}</td>
                            <td>{invoice.dueDate}</td>
                            <td>{invoice.jobId}</td>
                            <td>{invoice.status}</td>
                            <td>${invoice.price.toFixed(2)}</td>
                            <td>
                                {invoice.status !== "PAID" && (
                                    <>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => {
                                                setSelectedInvoiceId(invoice.id);
                                                setShowActionModal(true);
                                            }}
                                        >
                                            <MdEdit /> Mark as Paid
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {showActionModal && (
                <InvoiceActionModal
                    onShow={showActionModal}
                    onClose={() => setShowActionModal(false)}
                    invoiceNumber={selectedInvoiceId?.toString() || ''}
                    handleAction={handleMarkAsPaid}
                    actionType="UPDATE"
                />
            )}
        </div>
    );
}
