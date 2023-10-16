import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from './FormField';
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/ApiRootUrl";

const invoiceSchema = z.object({
    customerName: z.string(),
    invoiceNumber: z.string(),
    description: z.string().optional(),
    totalAmount: z.number(),
    invoiceDate: z.date(),
    dueDate: z.date()
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export function InvoiceForm() {
    const { employeeId } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceSchema)
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(data: InvoiceFormData) {
        try {
            const response = await api.post("/invoice", data);
            if (response.data.success) {
                // Show a success message or redirect
            } else {
                setErrorMessage(response.data.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred.");
        }
    }


    return (
        <div className="container">
            <h2>Invoice Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    fieldName="customerName"
                    label="Customer Name"
                    inputType="text"
                    fieldError={errors.customerName}
                    customError={errorMessage}
                    register={register}
                />
                <FormField
                    fieldName="invoiceNumber"
                    label="Invoice Number"
                    inputType="text"
                    fieldError={errors.invoiceNumber}
                    customError={errorMessage}
                    register={register}
                />
                <FormField
                    fieldName="description"
                    label="Description"
                    inputType="text"
                    fieldError={errors.description}
                    customError={errorMessage}
                    register={register}
                />
                <FormField
                    fieldName="totalAmount"
                    label="Total Amount"
                    inputType="number"
                    fieldError={errors.totalAmount}
                    customError={errorMessage}
                    register={register}
                />
                <FormField
                    fieldName="invoiceDate"
                    label="Invoice Date"
                    inputType="date"
                    fieldError={errors.invoiceDate}
                    customError={errorMessage}
                    register={register}
                />
                <FormField
                    fieldName="dueDate"
                    label="Due Date"
                    inputType="date"
                    fieldError={errors.dueDate}
                    customError={errorMessage}
                    register={register}
                />
                <button type="submit" className="btn btn-primary">
                    Register Invoice
                </button>
            </form>
        </div>
    );
}
