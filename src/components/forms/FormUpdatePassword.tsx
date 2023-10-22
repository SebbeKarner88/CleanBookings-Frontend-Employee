import {z} from "zod";
import {Dispatch, SetStateAction, useContext} from "react";
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

    async function onSubmit(data: FieldValues) {
        try {
            await updatePasswordEmployee(
                employeeId,
                data.currentPassword,
                data.newPassword
            );
            setShowModal(true)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                fieldName="currentPassword"
                label="Nuvarande lösenord"
                inputType="password"
                fieldError={errors.currentPassword}
                register={register}
            />

            <FormField
                fieldName="newPassword"
                label="Nytt lösenord"
                labelDescription="Måste innehålla minst 8 tecken, minst 1 nummer, minst 1 stor bokstav & minst 1 liten bokstav"
                inputType="password"
                fieldError={errors.newPassword}
                register={register}
            />

            <FormField
                fieldName="confirmPassword"
                label="Bekräfta lösenord"
                inputType="password"
                fieldError={errors.confirmPassword}
                register={register}
            />

            <Button type="submit" className="btn-dark-purple w-100 mb-3">
                Uppdatera lösenord
            </Button>

            <Button
                type="button"
                variant="danger"
                className="w-100"
                onClick={() => navigation("/my-pages")}
            >
                Tillbaka till mina sidor
            </Button>

        </form>
    )
}