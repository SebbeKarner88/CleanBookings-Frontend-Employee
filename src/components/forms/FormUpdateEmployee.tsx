import {useContext, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom"
import {z} from "zod";
import {AuthContext} from "../../context/AuthContext";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormField} from "./input/FormField.tsx";
import {Button, Modal} from "react-bootstrap";
import {updateEmployee} from "../../api/AdminApi.ts";
import {updateEmployeeCleaner} from "../../api/CleanerApi.ts";

const schema = z.object({
    firstName: z
        .string()
        .nonempty({message: "First name is required."}),
    lastName: z
        .string()
        .nonempty({message: "Last name is required."}),
    emailAddress: z
        .string()
        .nonempty({message: "Email is required."})
        .email({message: "Please provide a valid email address."}),
    phoneNumber: z
        .string()
        .nonempty({message: "Phone number is required."})
        .regex(/^[0-9+\-\s]*$/, {
            message: "Invalid phone number format. Only numbers (0-9), +, -, and white space are allowed.",
        })
})

type FormData = z.infer<typeof schema>;

export function FormUpdateEmployee() {
    const {employeeId} = useContext(AuthContext)
    const role = sessionStorage.getItem("role");
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigate()
    const location = useLocation()
    const values = location.state
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });


    async function onSubmit(data: FieldValues) {
        try {
            let response;

            if (role === "client_admin") {
                response = await updateEmployee(
                    employeeId,
                    values.id,
                    data.firstName !== values.firstName ? data.firstName : null,
                    data.lastName !== values.lastName ? data.lastName : null,
                    data.emailAddress !== values.emailAddress ? data.emailAddress : null,
                    data.phoneNumber !== values.phoneNumber ? data.phoneNumber : null
                );
            } else if (role === "client_cleaner") {
                response = await updateEmployeeCleaner(
                    employeeId,
                    values.id,
                    data.firstName !== values.firstName ? data.firstName : null,
                    data.lastName !== values.lastName ? data.lastName : null,
                    data.emailAddress !== values.emailAddress ? data.emailAddress : null,
                    data.phoneNumber !== values.phoneNumber ? data.phoneNumber : null
                );
            } else {
                throw new Error("Unknown role");
            }

            if (response?.status === 200) {
                setModalVisible(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

                <div className="px-2">
                    <h3 className="h2 fw-bold my-3 text-primary-emphasis">
                        Updating {values.role.toLowerCase().replace("client_", "")}
                    </h3>
                    <p className="h3 fw-bold my-3">
                        {values.firstName + " " + values.lastName}
                    </p>
                    <p className="h3 my-3">
                        {values.id}
                    </p>
                </div>
                <form
                    className="my-3 px-2 text-start"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormField
                        fieldName="firstName"
                        label="First name"
                        inputType="text"
                        defaultValue={values.firstName}
                        fieldError={errors.firstName}
                        register={register}
                    />

                    <FormField
                        fieldName="lastName"
                        label="Last name"
                        inputType="text"
                        defaultValue={values.lastName}
                        fieldError={errors.lastName}
                        register={register}
                    />

                    <FormField
                        fieldName="emailAddress"
                        label="Email address"
                        inputType="text"
                        defaultValue={values.emailAddress}
                        fieldError={errors.emailAddress}
                        register={register}
                    />

                    <FormField
                        fieldName="phoneNumber"
                        label="Phone number"
                        inputType="text"
                        defaultValue={values.phoneNumber}
                        fieldError={errors.phoneNumber}
                        register={register}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Update employee
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
                    <p>Employee with ID {values.id} has been updated.</p>
                </Modal.Body>
                <Modal.Footer className="bg-secondary-subtle">
                    <Button
                        variant="primary"
                        onClick={() => {
                            setModalVisible(!modalVisible)
                            navigation("/my-pages")
                        }}
                    >
                        Back to dashboard
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}