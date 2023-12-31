import { useContext, useState } from "react"
import { updateCustomer } from "../../api/AdminApi"
import { useLocation, useNavigate } from "react-router-dom"
import { z } from "zod";
import { AuthContext } from "../../context/AuthContext";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./input/FormField.tsx";
import { Button, Modal } from "react-bootstrap";

const schema = z.object({
    firstName: z
        .string(),
    lastName: z
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
    const navigation = useNavigate()
    const location = useLocation()
    const values = location.state
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
            values.customerId,
            data.firstName != values.firstName ? data.firstName : null,
            data.lastName != values.lastName ? data.lastName : null,
            data.streetAddress != values.streetAddress ? data.streetAddress : null,
            data.postalCode != values.postalCode ? data.postalCode : null,
            data.city != values.city ? data.city : null,
            data.phoneNumber != values.phoneNumber ? data.phoneNumber : null,
            data.emailAddress != values.emailAddress ? data.emailAddress : null
        ).then(response => {
            if (response?.status == 200) {
                setModalVisible(true)
            } else {
                setErrorMessage("Something went wrong, try again.");
            }
        }).catch(error => console.error(error.message));
    }

    return (
        <>
        <div className="container-fluid bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
             data-bs-theme="dark">
            <h1>Updating customer {values.firstName + " " + values.lastName}</h1>
            <h3>Customer ID: {values.customerId}</h3>
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
                            defaultValue={values.firstName}
                            fieldError={errors.firstName}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="lastName"
                            label="Last name"
                            inputType="text"
                            defaultValue={values.lastName}
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
                            defaultValue={values.streetAddress}
                            fieldError={errors.streetAddress}
                            register={register}
                        />
                    </div>
                    <div className="col-md-2">
                        <FormField
                            fieldName="postalCode"
                            label="Postal code"
                            inputType="text"
                            defaultValue={values.postalCode}
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
                            defaultValue={values.city}
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
                            defaultValue={values.phoneNumber}
                            fieldError={errors.phoneNumber}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="emailAddress"
                            label="Email address"
                            inputType="text"
                            defaultValue={values.emailAddress}
                            fieldError={errors.emailAddress}
                            customError={errorMessage}
                            register={register}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-light w-100"
                >
                    Update customer
                </button>
                <button
                type="button"
                className="btn btn-outline-danger w-100 mt-3"
                onClick={() => navigation("/my-pages")}
                >
                    Cancel
                </button>
            </form>
            <Modal
                show={modalVisible}
                onHide={() => setModalVisible(!modalVisible)}
                fullscreen="md-down"
            >
                <Modal.Header
                    className="bg-secondary-subtle"
                    closeButton
                >
                    <Modal.Title className="fs-6 fw-bold">
                        {"Update successful!"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-secondary-subtle">
                    <p>Customer with ID {values.customerId} has been updated.</p>
                </Modal.Body>
                <Modal.Footer className="bg-secondary-subtle">
                    <Button
                        variant="primary"
                        onClick={() => {
                            setModalVisible(!modalVisible)
                            navigation("/my-pages")
                        }}
                    >
                        Return to My Pages
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    )
}