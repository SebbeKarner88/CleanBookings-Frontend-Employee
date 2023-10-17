import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from './input/FormField.tsx';
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/ApiRootUrl";

const paymentSchema = z.object({
    customerName: z.string(),
    invoiceNumber: z.string(),
    amount: z.number(),
    paymentDate: z.date()
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export function PaymentForm() {
    const { employeeId } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema)
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(data: PaymentFormData) {
        try {
            const response = await api.put(`/payment/markAsPaid`, null, {
                params: {
                    adminId: employeeId,
                    invoiceId: data.invoiceNumber
                }
            });

            if (response.status === 200) {
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
            <h2>Payment Form</h2>
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
                    fieldName="amount"
                    label="Amount"
                    inputType="number"
                    fieldError={errors.amount}
                    customError={errorMessage}
                    register={register}
                />
                <FormField
                    fieldName="paymentDate"
                    label="Payment Date"
                    inputType="date"
                    fieldError={errors.paymentDate}
                    customError={errorMessage}
                    register={register}
                />
                <button type="submit" className="btn btn-primary">
                    Register Payment
                </button>
            </form>
        </div>
    );
}
