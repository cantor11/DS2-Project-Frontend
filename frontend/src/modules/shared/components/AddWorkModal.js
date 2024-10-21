import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { createWork } from '../../../api/WorkApi';

const AddWorkModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const newWork = {
            name: e.target.name.value,
            location: e.target.location.value,
            director: e.target.director.value,
            type: e.target.type.value,
            personnel: {
                director: e.target.personnel_director.value,
                capataz: e.target.personnel_capataz.value,
                peones: e.target.personnel_peones.value,
                ayudantes: e.target.personnel_ayudantes.value
            }
        };
        createWork(newWork)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
            (error) => {
                alert("Fallo en agregar ");
            });
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Registrar obra
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" required placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="location">
                                <Form.Label>Ubicación</Form.Label>
                                <Form.Control type="text" name="location" required placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="director">
                                <Form.Label>Director</Form.Label>
                                <Form.Control type="text" name="director" required placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="type">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select name="type" required>
                                    <option value="" disabled>Selecciona un tipo</option>
                                    <option value="casa">Casa</option>
                                    <option value="condominio">Condominio</option>
                                    <option value="edificio">Edificio</option>
                                    <option value="centro comercial">Centro Comercial</option>
                                    <option value="plazoleta">Plazoleta</option>
                                    <option value="colegio">Colegio</option>
                                    <option value="universidad">Universidad</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="personnel_director">
                                <Form.Label>Director (Personal)</Form.Label>
                                <Form.Control type="text" name="personnel_director" required placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="personnel_capataz">
                                <Form.Label>Capataz</Form.Label>
                                <Form.Control type="text" name="personnel_capataz" required placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="personnel_peones">
                                <Form.Label>Peones</Form.Label>
                                <Form.Control type="number" name="personnel_peones" required placeholder="" min="0" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="personnel_ayudantes">
                                <Form.Label>Ayudantes</Form.Label>
                                <Form.Control type="number" name="personnel_ayudantes" required placeholder="" min="0" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="primary" type="submit">
                                Registrar
                            </Button>
                            <Button variant="danger" onClick={props.onHide}>
                                Cerrar
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddWorkModal;

