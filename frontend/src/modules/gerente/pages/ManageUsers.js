import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddUserModal from "../../gerente/components/AddUserModal";
import UpdateUserModal from "../../gerente/components/UpdateUserModal";
import { getAllUsers, updateUser } from "../../../api/UserApi";
import "../../../App.css";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editUser, setEditUser] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (users.length && !isUpdated) {
            return;
        }
        getAllUsers()
            .then(data => {
                if (mounted) {
                    setUsers(data);
                }
            });
        return () => {
            mounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, users]);

    const handleUpdate = (e, user) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditUser(user);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, user) => {
        if (window.confirm('¿Está seguro?')) {
            e.preventDefault();
            const updatedUser = { activo: false };  // Solo enviar el campo que se va a actualizar
            updateUser(user.identificacion, updatedUser)
                .then((result) => {
                    console.log('Resultado de la actualización:', result);
                    alert('Usuario desactivado exitosamente');
                    setIsUpdated(true);
                })
                .catch((error) => {
                    if (error.response) {
                        console.error('Errores de validación:', error.response.data);
                    } else {
                        console.error('Error al desactivar el usuario:', error);
                    }
                    alert("Error al desactivar el usuario");
                });
        }
    };

    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <p id="manage"></p>
                <div className='table-responsive'>
                    <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Fotografía</th>
                                <th>Tipo Identificación</th>
                                <th>Nro. Identificación</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Usuario</th>
                                <th>Contraseña</th>
                                <th>Género</th>
                                <th>Dirección</th>
                                <th>Celular</th>
                                <th>Rol</th>
                                <th>Activo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) =>
                                <tr key={user.identificacion}>
                                    <td>{index + 1}</td>
                                    <td ><img className="rounded-circle" src={user.fotografia} alt="Fotografía" width="50" height="50" /></td>
                                    <td>{user.tipoIdentificacion}</td>
                                    <td>{user.identificacion}</td>
                                    <td>{user.nombres}</td>
                                    <td>{user.apellidos}</td>
                                    <td>{user.login}</td>
                                    <th>{user.clave}</th>
                                    <td>{user.genero}</td>
                                    <td>{user.direccion}</td>
                                    <td>{user.celular}</td>
                                    <td>{user.rol}</td>
                                    <td style={{ color: user.activo ? 'green' : 'red' }}>
                                        {user.activo ? '◉' : '◉'}
                                    </td>
                                    <td>
                                        <Button className="mr-2" variant="danger"
                                            onClick={event => handleDelete(event, user)}>
                                            <RiDeleteBin5Line />
                                        </Button>
                                        <span>&nbsp;&nbsp;&nbsp;</span>
                                        <Button className="mr-2"
                                            onClick={event => handleUpdate(event, user)}>
                                            <FaEdit />
                                        </Button>
                                        <UpdateUserModal show={editModalShow} user={editUser} setUpdated={setIsUpdated}
                                            onHide={EditModelClose}></UpdateUserModal>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
                <ButtonToolbar>
                    <Button variant="primary" onClick={handleAdd}>
                        Crear Usuario
                    </Button>
                    <AddUserModal show={addModalShow} setUpdated={setIsUpdated}
                        onHide={AddModelClose}></AddUserModal>
                </ButtonToolbar>
            </div>
        </div>
    );
};

export default ManageUsers;