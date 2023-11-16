// import FormUpdatePassword from "./forms/FormUpdatePassword.tsx";
// import NavBar from "../common/NavBar.tsx";
// import {Footer} from "../common/Footer.tsx";
// import FormEditEmployeeData from "./forms/FormEditEmployeeData.tsx";
import {FormUpdateEmployee} from "../components/forms/FormUpdateEmployee.tsx";
import {Button, Modal} from "react-bootstrap";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import FormUpdatePassword from "../components/forms/FormUpdatePassword.tsx";
import {NavBar} from "../components/common/NavBar.tsx";

const EditEmployeeDataView = () => {
    const {employeeId} = useContext(AuthContext);
    const navigation = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div className="container bg-dark min-vh-100 min-vw-100 text-bg-dark p-3 m-0 overflow-scroll"
             data-bs-theme="dark">
            <NavBar />

                    <div className="container bg-dark-subtle mt-3 p-3 rounded-4 text-start border border-dark-subtle">
                        <h2 className="fw-bold mx-2 text-md-center">
                            Update user data
                        </h2>
                        <FormUpdateEmployee />
                    </div>
                    <div className="container bg-dark-subtle my-3 p-3 rounded-4 text-start border border-dark-subtle">
                        <h2 className="fw-bold mx-2 text-md-center">
                            Change password
                        </h2>
                        <FormUpdatePassword setShowModal={setModalVisible}/>
                    </div>

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
                        Uppdateringen lyckades!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Din nya data för {employeeId} har blivit uppdaterat.</p>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        variant="primary"
                        onClick={() => {
                            setModalVisible(!modalVisible);
                            navigation("/my-pages");
                        }}
                    >
                        Tillbaka till mina sidor
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditEmployeeDataView;