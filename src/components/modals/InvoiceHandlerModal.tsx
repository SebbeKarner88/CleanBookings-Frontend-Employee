import { ReactNode } from "react";
import Modal from "../common/Modal";

type ActionType = 'UPDATE' | 'DELETE';

interface IInvoiceActionModal {
    onShow: boolean;
    onClose: () => void;
    invoiceNumber: string;
    handleAction: () => void;
    isProcessing?: boolean;
    actionType: ActionType;
}

export default function InvoiceActionModal({
                                               onShow,
                                               onClose,
                                               invoiceNumber,
                                               handleAction,
                                               isProcessing = false,
                                               actionType
                                           }: IInvoiceActionModal) {
    const renderModalBody = () => {
        switch (actionType) {
            case 'UPDATE':
                return <p>Are you sure you want to update the payment status for Invoice: {invoiceNumber}?</p>;
            case 'DELETE':
                return <p>Are you sure you want to delete Invoice: {invoiceNumber}?</p>;
            default:
                return null;
        }
    };

    const renderActionButton = (): ReactNode => {
        if (isProcessing) {
            return (
                <span>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {actionType === 'UPDATE'? "Updating..." : "Deleting..."}
</span>
            );
        }
        return actionType === 'UPDATE' ? "Update Payment Status" : "Delete Invoice";
    };

    return (
        <Modal
            id="invoiceActionModal"
            title={actionType === 'UPDATE' ? "Update Payment Status" : "Delete Invoice"}
            body={renderModalBody()}
            actionButtonLabel={renderActionButton()}
            handleActionButton={handleAction}
        />
    );
}