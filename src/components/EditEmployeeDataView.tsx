// import FormUpdatePassword from "./forms/FormUpdatePassword.tsx";
// import NavBar from "../common/NavBar.tsx";
// import {Footer} from "../common/Footer.tsx";
// import FormEditEmployeeData from "./forms/FormEditEmployeeData.tsx";
import {FormUpdateEmployee} from "./forms/FormUpdateEmployee.tsx";
import {Button, Modal} from "react-bootstrap";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import FormUpdatePassword from "./forms/FormUpdatePassword.tsx";

const EditEmployeeDataView = () => {
    const {employeeId} = useContext(AuthContext);
    const navigation = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            {/*<NavBar />*/}
            <div className="bg-dark-beige min-vw-100 min-vh-100 p-3">
                <div className="container">

                    <div className="row bg-beige p-3 p-md-4 rounded-4 text-start border border-dark-subtle">
                        <h2 className="fw-bold">
                            Ändra användaruppgifter
                        </h2>
                        {/*<FormUpdateEmployee setShowModal={setModalVisible} />*/}
                        <FormUpdateEmployee />
                    </div>

                    <div className="row bg-beige mt-3 p-3 p-md-4 rounded-4 text-start border border-dark-subtle">
                        <h2 className="fw-bold">
                            Ändra lösenord
                        </h2>
                        <FormUpdatePassword setShowModal={setModalVisible}/>
                    </div>
                </div>
            </div>

            {/*<Footer />*/}

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
        </>
    );
};

export default EditEmployeeDataView;