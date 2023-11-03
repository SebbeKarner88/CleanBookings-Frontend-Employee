import { InvoiceTable } from "../../../components/tables/jobs/InvoiceTable.tsx";

interface IInvoiceTab {
    isActive: boolean;
}

export default function InvoiceTab({isActive}: IInvoiceTab) {
    return (
        <div className="container">
            <h2 className="text-md-center fw-bold my-3 text-primary-emphasis">Invoices</h2>

            <div className="my-3">
                <InvoiceTable isActive={isActive} />
            </div>
        </div>
    )
}
