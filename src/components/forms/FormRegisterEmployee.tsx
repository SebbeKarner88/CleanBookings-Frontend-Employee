import {FieldValues, useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {FormField} from "./input/FormField.tsx";
import {registerEmployee} from "../../api/AdminApi.ts";

const schema = z.object({
    firstName: z
        .string()
        .nonempty({message: "First name is required."}),
    lastName: z
        .string()
        .nonempty({message: "Last name is required."}),
    phoneNumber: z
        .string()
        .nonempty({message: "Phone number is required."})
        .regex(/^[0-9+\-\s]*$/, {
            message: "Invalid phone number format. Only numbers (0-9), +, -, and white space are allowed.",
        }),
    emailAddress: z
        .string()
        .nonempty({message: "Email is required."})
        .email({message: "Please provide a valid email address."})
});

type FormData = z.infer<typeof schema>;

interface IFormRegisterEmployee {
    role: "ADMIN" | "CLEANER";
}

export default function FormRegisterEmployee({role}: IFormRegisterEmployee) {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    // const {employeeId} = useContext(AuthContext);
    const navigation = useNavigate();

    async function onSubmit(data: FieldValues) {
        const response = await registerEmployee(
            data.firstName,
            data.lastName,
            data.phoneNumber,
            role,
            data.emailAddress,
        );
        if (response?.status == 201)
            navigation("/my-pages")
    }

    return (
        <form className="my-3 my-md-5 px-4 text-start"
              onSubmit={handleSubmit(onSubmit)}>
            <h1 className="my-3 fw-bold text-md-center">New {role.toLowerCase()}</h1>
            <h2 className="my-3 fw-semibold text-primary-emphasis">Contact details</h2>
                    <FormField
                        fieldName="firstName"
                        label="First name"
                        inputType="text"
                        fieldError={errors.firstName}
                        register={register}
                    />

                    <FormField
                        fieldName="lastName"
                        label="Last name"
                        inputType="text"
                        fieldError={errors.lastName}
                        register={register}
                    />

                    <FormField
                        fieldName="phoneNumber"
                        label="Phone number"
                        inputType="tel"
                        fieldError={errors.phoneNumber}
                        register={register}
                    />

                    <FormField
                        fieldName="emailAddress"
                        label="Email address"
                        inputType="email"
                        fieldError={errors.emailAddress}
                        register={register}
                    />

            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                Register
            </button>
            <button
                type="button"
                className="btn btn-outline-danger w-100 mt-3"
                onClick={() => navigation("/my-pages")}
                aria-label="Press button to go back to dashboard"
            >
                Cancel
            </button>
        </form>
    )
}