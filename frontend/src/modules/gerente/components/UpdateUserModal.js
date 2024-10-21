import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateUser } from '../../../api/UserApi';

const UpdateUserModal = (props) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoChange = (e) => {
        setSelectedPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Solo agregar la fotografía si se ha seleccionado una nueva
        if (selectedPhoto) {
            formData.append('fotografia', selectedPhoto);
        } else {
            formData.append('fotografia', props.user.fotografia);
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


        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        // Llamar a la función updateUser con los datos del formulario
        if (props.user.identificacion) {
            const result = await updateUser(props.user.identificacion, formData);
            if (result) {
                console.log('Usuario actualizado exitosamente');
                props.onHide(); // Cerrar el modal después de actualizar el usuario
            } else {
                console.error('Error al actualizar el usuario');
            }
        } else {
            console.error('ID de usuario no definido');
        }
    };    

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="update-user-modal" >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Actualizar información del usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Fila para la fotografía y rol */}
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="fotografia">
                                <Form.Label>Fotografía</Form.Label>
                                <Form.Control type="file" name="fotografia" onChange={handlePhotoChange} />
                                {props.user.fotografia && !selectedPhoto && (
                                    <img src={props.user.fotografia} alt="Fotografía actual" width="50" height="50" />
                                )}
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="rol">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control as="select" name="rol" required defaultValue={props.user.rol} disabled>
                                    <option value="">Seleccione...</option>
                                    <option value="director">Director</option>
                                    <option value="capataz">Capataz</option>
                                    <option value="peon">Peon</option>
                                    <option value="ayudante">Ayudante</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Fila para tipo identificacion y número de identificación*/}
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="tipoIdentificacion">
                                <Form.Label>Tipo de Identificación</Form.Label>
                                <Form.Control as="select" name="tipoIdentificacion" required defaultValue={props.user.tipoIdentificacion}>
                                    <option value="">Seleccione...</option>
                                    <option value="CC">Cédula</option>
                                    <option value="TI">Tarjeta Identidad</option>
                                    <option value="CR">Contraseña</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>                        
                        <Col xs={12} md={6}>
                            <Form.Group controlId="identificacion">
                                <Form.Label>Número de Identificación</Form.Label>
                                <Form.Control type="text" name="identificacion" defaultValue={props.user.identificacion} disabled />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Fila para nombres y apellidos */}
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="nombres">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control type="text" name="nombres" required defaultValue={props.user.nombres} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="apellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" name="apellidos" required defaultValue={props.user.apellidos} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Fila para login y contraseña */}
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="login">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" name="login" required defaultValue={props.user.login} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="clave">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="clave" required defaultValue={props.user.clave} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Fila para género y dirección */}
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="genero">
                                <Form.Label>Género</Form.Label>
                                <Form.Control as="select" name="genero" required defaultValue={props.user.genero}>
                                    <option value="">Seleccione...</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="direccion">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control type="text" name="direccion" required defaultValue={props.user.direccion} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Fila para celular y email*/}
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="celular">
                                <Form.Label>Celular</Form.Label>
                                <Form.Control type="text" name="celular" required defaultValue={props.user.celular} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="correoElectronico">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control type="email" name="correoElectronico" required defaultValue={props.user.correoElectronico} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Botones de acción */}
                    <Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="primary" type="submit">
                                Actualizar
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

export default UpdateUserModal;