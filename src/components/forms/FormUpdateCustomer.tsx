import { useContext, useState } from "react"
import { updateCustomer } from "../../api/AdminApi"
import { useLocation, useNavigate } from "react-router-dom"
import { z } from "zod";
import { AuthContext } from "../../context/AuthContext";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./FormField";

const schema = z.object({
    firstName: z
        .string(),
    lastName: z
        .string(),
    customerType: z
        .string(),
    streetAddress: z
        .string(),
    postalCode: z
        .string(),
    city: z
        .string(),
    phoneNumber: z
        .string(),
    emailAddress: z
        .string(),
})

type FormData = z.infer<typeof schema>;

export function FormUpdateCustomer() {
    const { employeeId } = useContext(AuthContext)
    const [ modalVisible, setModalVisible ] = useState(false)
    // const [ isUpdating, setIsUpdating ] = useState(false)
    // const navigation = useNavigate()
    const location = useLocation()
    const data = location.state
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    function onSubmit(data: FieldValues) {
        updateCustomer(
            employeeId,
            data.customerId,
            data.firstName,
            data.lastName,
            data.customerType,
            data.streetAddress,
            data.postalCode,
            data.city,
            data.phoneNumber,
            data.emailAddress
        ).then(response => {
            if (response?.status == 200) {
                console.log("Everything went according to plan!")
                // TODO: add modal when successful ? send back to adminPage ?
            } else {
                setErrorMessage("Something went wrong, try again.");
            }
        }).catch(error => console.error(error.message));
    }

    return (
        <>
            <h1>Updating customer {data.firstName + " " + data.lastName}</h1>
            <h3>Customer ID: {data.customerId}</h3>
            <form
                className="my-3 my-md-5 px-4 text-start"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="row">
                    <div className="col-md-6">
                        <FormField
                            fieldName="firstName"
                            label="First name"
                            inputType="text"
                            placeholder={data.firstName}
                            fieldError={errors.firstName}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="lastName"
                            label="Last name"
                            inputType="text"
                            placeholder={data.lastName}
                            fieldError={errors.lastName}
                            customError={errorMessage}
                            register={register}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <FormField
                            fieldName="streetAddress"
                            label="Street address"
                            inputType="text"
                            placeholder={data.streetAddress}
                            fieldError={errors.streetAddress}
                            register={register}
                        />
                    </div>
                    <div className="col-md-2">
                        <FormField
                            fieldName="postalCode"
                            label="Postal code"
                            inputType="text"
                            placeholder={data.postalCode}
                            fieldError={errors.postalCode}
                            customError={errorMessage}
                            register={register}
                        />
                    </div>
                    <div className="col-md-5">
                        <FormField
                            fieldName="city"
                            label="City"
                            inputType="text"
                            placeholder={data.city}
                            fieldError={errors.city}
                            customError={errorMessage}
                            register={register}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormField
                            fieldName="phoneNumber"
                            label="Phone Number"
                            inputType="text"
                            placeholder={data.phoneNumber}
                            fieldError={errors.phoneNumber}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="emailAddress"
                            label="Email address"
                            inputType="text"
                            placeholder={data.emailAddress}
                            fieldError={errors.emailAddress}
                            customError={errorMessage}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="customerType"
                            label="Customer Type"
                            inputType="text"
                            placeholder={data.customerType}
                            fieldError={errors.customerType}
                            customError={errorMessage}
                            register={register}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-dark w-100"
                    onClick={() => {
                        setModalVisible(true)

                    }}
                >
                    Update customer
                </button>
            </form>
        </>
    )
}