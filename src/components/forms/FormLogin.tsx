import {useContext, useState} from "react";
import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {FormField} from "./FormField.tsx";
import {AuthContext} from "../../context/AuthContext.tsx";
import {loginEmployee} from "../../api/EmployeeApi.ts";

const schema = z.object({
    emailAddress: z
        .string()
        .nonempty({message: "Email is required."})
        .email({message: "Please provide a valid email address."}),
    password: z
        .string()
        .nonempty({message: "Password is required."}),
});

type FormData = z.infer<typeof schema>;

export function FormLogin() {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigation = useNavigate();
    const {setIsAuthenticated, setEmployeeId, setRole} = useContext(AuthContext);

    function onSubmit(data: FieldValues) {
        loginEmployee(data.emailAddress, data.password, setIsAuthenticated, setEmployeeId, setRole).then(response => {
            if (response?.status == 200) {
                navigation("/my-pages");
            } else {
                setErrorMessage("Email or password are incorrect!");
            }
        }).catch(error => console.error(error.message));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="h4 mb-3 fw-bold">
                Login
            </h1>
            {errorMessage && <div className="text-danger my-1">{errorMessage}</div>}
            <FormField
                fieldName="emailAddress"
                label="Email address"
                inputType="email"
                fieldError={errors.emailAddress}
                customError={errorMessage}
                register={register}
            />
            <FormField
                fieldName="password"
                label="Password"
                inputType="password"
                fieldError={errors.password}
                customError={errorMessage}
                register={register}
            />
            <button type="submit" className="btn btn-primary w-100">Sign in</button>
        </form>
    )
}