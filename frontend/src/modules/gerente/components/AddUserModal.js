import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { createUser } from '../../../api/UserApi';

const AddUserModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const foto = e.target.fotografia.files[0];

        // Si no se selecciona una foto, se almacena una cadena vacía
        if (foto) {
            formData.append('fotografia', foto);
        } else {
            formData.append('fotografia', "");
        }

        formData.append('tipoIdentificacion', e.target.tipoIdentificacion.value);
        formData.append('identificacion', e.target.identificacion.value);
        formData.append('apellidos', e.target.apellidos.value);
        formData.append('nombres', e.target.nombres.value);
        formData.append('correoElectronico', e.target.correoElectronico.value);
        formData.append('login', e.target.login.value);
        formData.append('clave', e.target.clave.value);
        formData.append('genero', e.target.genero.value);
        formData.append('direccion', e.target.direccion.value);
        formData.append('celular', e.target.celular.value);
        formData.append('activo', true);
        formData.append('rol', e.target.rol.value);

        createUser(formData)
            .then((result) => {
                alert('Usuario creado exitosamente');
                props.setUpdated(true);
            })
            .catch((error) => {
                alert("Error al agregar usuario");
                console.error(error);
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
                    Complete la Información del Usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="fotografia">
                                <Form.Label>Fotografía</Form.Label>
                                <Form.Control type="file" name="fotografia" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="rol">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control as="select" name="rol" required>
                                    <option value="">Seleccione...</option>
                                    <option value="director">Director</option>
                                    <option value="capataz">Capataz</option>
                                    <option value="peon">Peon</option>
                                    <option value="ayudante">Ayudante</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="tipoIdentificacion">
                                <Form.Label>Tipo de Identificación</Form.Label>
                                <Form.Control as="select" name="tipo_identificacion" required>
                                    <option value="">Seleccione...</option>
                                    <option value="CC">Cédula</option>
                                    <option value="TI">Tarjeta identidad</option>
                                    <option value="CR">Contraseña</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="identificacion">
                                <Form.Label>Número de Identificación</Form.Label>
                                <Form.Control type="text" name="identificacion" required placeholder="" />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="nombres">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control type="text" name="nombres" required placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="apellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" name="apellidos" required placeholder="" />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="login">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" name="username" required placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="clave">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" required placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="genero">
                                <Form.Label>Género</Form.Label>
                                <Form.Control as="select" name="genero">
                                    <option value="">Seleccione...</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="direccion">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control type="text" name="direccion" required placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="celular">
                                <Form.Label>Celular</Form.Label>
                                <Form.Control type="text" name="celular" required placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="correoElectronico">
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control type="text" name="correo" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="primary" type="submit">
                                Crear
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

export default AddUserModal;
