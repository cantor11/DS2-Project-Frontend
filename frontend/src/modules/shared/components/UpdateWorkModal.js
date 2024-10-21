import React, { useEffect, useState } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateWork } from '../../../api/WorkApi';

const UpdateWorkModal = (props) => {
    const [localWork, setLocalWork] = useState({
        name: '',
        location: '',
        director: '',
        type: '',
        personnel: {
            director: '',
            capataz: '',
            peones: '',
            ayudantes: ''
        }
    });

    useEffect(() => {
        if (props.work) {
            setLocalWork({
                ...props.work,
                personnel_director: props.work.personnel?.director || '',
                personnel_capataz: props.work.personnel?.capataz || '',
                personnel_peones: props.work.personnel?.peones || '',
                personnel_ayudantes: props.work.personnel?.ayudantes || ''
            });
        }
    }, [props.work]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalWork(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedWork = {
            ...localWork,
            personnel: {
                director: localWork.personnel_director,
                capataz: localWork.personnel_capataz,
                peones: localWork.personnel_peones,
                ayudantes: localWork.personnel_ayudantes
            }
        };
        updateWork(updatedWork)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
                props.onHide();
            })
            .catch((error) => {
                alert("Failed to Update Work");
            });
    };

    return (
        <div className="container">
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Actualizar Información de Obras
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        required
                                        value={localWork.name}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group controlId="location">
                                    <Form.Label>Ubicación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        required
                                        value={localWork.location}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group controlId="director">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="director"
                                        required
                                        value={localWork.director}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group controlId="type">
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Select
                                        name="type"
                                        required
                                        value={localWork.type}
                                        onChange={handleChange}
                                    >
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
                                <Form.Group controlId="personnel_director">
                                    <Form.Label>Director (Personal)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="personnel_director"
                                        required
                                        value={localWork.personnel_director}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group controlId="personnel_capataz">
                                    <Form.Label>Capataz</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="personnel_capataz"
                                        required
                                        value={localWork.personnel_capataz}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group controlId="personnel_peones">
                                    <Form.Label>Peones</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="personnel_peones"
                                        required
                                        value={localWork.personnel_peones}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group controlId="personnel_ayudantes">
                                    <Form.Label>Ayudantes</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="personnel_ayudantes"
                                        required
                                        value={localWork.personnel_ayudantes}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Registrar
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="button" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UpdateWorkModal;
