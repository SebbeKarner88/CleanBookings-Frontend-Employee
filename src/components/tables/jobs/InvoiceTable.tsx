import {useEffect, useState, useContext} from 'react';
import {deleteInvoice, markInvoiceAsPaid} from "../../../api/AdminApi";
import InvoiceActionModal from "../../modals/InvoiceHandlerModal";
import {AuthContext} from "../../../context/AuthContext";
import {getAllAdminInvoices} from "../../../api/AdminApi";
import {Button} from "react-bootstrap";
import {MdDeleteForever} from "react-icons/md";

interface Invoice {
    id: number;
    issueDate: string;
    dueDate: string;
    jobId: string;
    status: "INVOICED" | "PAID" | "OVERDUE";
    price: number;
}

type Action = "Update" | "Delete" | undefined;

export const InvoiceTable = () => {
    const {employeeId} = useContext(AuthContext);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [isSendingRequest, setIsSendingRequest] = useState<boolean>(false);
    const [actionType, setActionType] = useState<Action>(undefined);
    const [updateNeeded, setUpdateNeeded] = useState<boolean>(false);

    const handleMarkAsPaid = async () => {
        if (selectedInvoiceId) {
            setIsSendingRequest(true);
            const {success, message} = await markInvoiceAsPaid(employeeId, selectedInvoiceId.toString());
            if (success)
                setShowActionModal(false);
            else
                console.error('Error marking invoice as paid:', message);
            setIsSendingRequest(false);
            setUpdateNeeded(updateNeeded => !updateNeeded);
        }
    }

    const handleDelete = async () => {
        if (selectedInvoiceId) {
            setIsSendingRequest(true);
            const response = await deleteInvoice(employeeId, selectedInvoiceId.toString());
            if (response?.status === 200) {
                setShowActionModal(false);
                setUpdateNeeded(updateNeeded => !updateNeeded);
            }
            setIsSendingRequest(false);
        }
    }

    useEffect(() => {
        async function fetchInvoices() {
            setIsLoading(true);
            const {success, data, message} = await getAllAdminInvoices(employeeId);
            if (success) {
                setIsLoading(false);
                return data;
            } else {
                console.error('Error fetching invoices:', message);
            }
        }
        fetchInvoices().then(data => setInvoices(data));
    }, [employeeId, updateNeeded]);

    return (
        <>
            {
                isLoading
                    ? <div>Loading...</div>
                    : (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                                <th>Job ID</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th className="text-center" scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                invoices.map(invoice => (
                                    <tr key={invoice.id} className="align-middle">
                                        <td>{invoice.id}</td>
                                        <td>{invoice.issueDate}</td>
                                        <td>{invoice.dueDate}</td>
                                        <td>{invoice.jobId}</td>
                                        <td className="fw-bold text-success">
                                            {
                                                invoice.status !== "PAID"
                                                    ? (
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => {
                                                                setSelectedInvoiceId(invoice.id);
                                                                setActionType("Update");
                                                                setShowActionModal(true);
                                                            }}
                                                        >
                                                            Mark as Paid
                                                        </Button>
                                                    ) : invoice.status
                                            }
                                        </td>
                                        <td>${invoice.price.toFixed(2)}</td>
                                        <td className="text-center">
                                            <Button
                                                variant="btn"
                                                className="btn focus-ring focus-ring-light"
                                                type="button"
                                                aria-label="Press button to delete admin"
                                                onClick={() => {
                                                    setSelectedInvoiceId(invoice.id);
                                                    setActionType("Delete");
                                                    setShowActionModal(true);
                                                }}
                                            >
                                                <MdDeleteForever color="#dc3545" size={30} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    )
            }
            {
                showActionModal &&
                <InvoiceActionModal
                    onShow={showActionModal}
                    onClose={() => setShowActionModal(false)}
                    invoiceNumber={selectedInvoiceId?.toString() || ''}
                    handleAction={actionType === "Update" ? handleMarkAsPaid : handleDelete}
                    actionType={actionType}
                    isSendingRequest={isSendingRequest}
                />
            }
        </>
    );
}
