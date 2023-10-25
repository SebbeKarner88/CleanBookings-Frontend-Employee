
interface InvoiceActionModalProps {
    onShow: boolean;
    onClose: () => void;
    invoiceNumber: string;
    handleAction: () => void;
    actionType: 'UPDATE' | 'DELETE';
}

const InvoiceActionModal: React.FC<InvoiceActionModalProps> = ({ onShow, onClose, invoiceNumber, handleAction, actionType }) => {
    return (
        <div className={`modal ${onShow ? 'show' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{actionType} Invoice</h2>
                <p>Do you want to {actionType.toLowerCase()} invoice {invoiceNumber}?</p>
                <div className="buttons">
                    <button onClick={handleAction}>{actionType}</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceActionModal;
