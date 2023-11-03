import {z} from "zod";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updatePasswordEmployee} from "../../api/EmployeeApi.ts";
import {FormField} from "./input/FormField.tsx";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const schema = z.object({
    currentPassword: z
        .string(),
    newPassword: z
        .string()
        .min(8, {message: "Password must be at least 8 characters."})
        .regex(/\d/, {message: "Password must contain at least one digit [0-9]."})
        .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter [A-Z]"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter [a-z]"}),
    confirmPassword: z
        .string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

interface IFormUpdatePassword {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function FormUpdatePassword({setShowModal}: IFormUpdatePassword) {
    const {employeeId} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const navigation = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(data: FieldValues) {
        try {
            const response = await updatePasswordEmployee(
                employeeId,
                data.currentPassword,
                data.newPassword
            );
            if (response?.status === 204) {
                setErrorMessage(null);
                setShowModal(true)
            } else {
                setErrorMessage("Incorrect password.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="px-2" onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && <div className="my-1 fw-bold text-danger">{errorMessage}</div>}
            <FormField
                fieldName="currentPassword"
                label="Current password"
                inputType="password"
                fieldError={errors.currentPassword}
                customError={errorMessage}
                register={register}
            />

            <FormField
                fieldName="newPassword"
                label="New password"
                labelDescription="Must contain at least 8 characters, 1 digit [0-9], 1 uppercase [A-Z] and 1 lowercase [a-z] letter"
                inputType="password"
                fieldError={errors.newPassword}
                register={register}
            />

            <FormField
                fieldName="confirmPassword"
                label="Confirm password"
                inputType="password"
                fieldError={errors.confirmPassword}
                register={register}
            />

            <Button type="submit" className="btn-dark-purple w-100 mb-3">
                Update your password
            </Button>

            <Button
                type="button"
                variant="danger"
                className="w-100"
                onClick={() => navigation("/my-pages")}
            >
                Back to dashboard
            </Button>

        </form>
    )
}