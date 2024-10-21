import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddWorkModal from "../../shared/components/AddWorkModal";
import UpdateWorkModal from "../../shared/components/UpdateWorkModal";
import { getAllWorks, deleteWork } from "../../../api/WorkApi";

const ManageWorks = () => {
    const [works, setWorks] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editWork, setEditWork] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (works.length && !isUpdated) {
            return;
        }
        getAllWorks()
            .then(data => {
                if (mounted) {
                    setWorks(data);
                }
            })
            .catch(error => {
                console.error("Error fetching works:", error);
            });
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, works]);

    const handleUpdate = (e, work) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditWork(work);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, workId) => {
        if (window.confirm('Are you sure ?')) {
            e.preventDefault();
            deleteWork(workId)
                .then(result => {
                    alert(result);
                    setIsUpdated(true);
                })
                .catch(error => {
                    alert("Failed to Delete Work");
                });
        }
    };

    const AddModelClose = () => setAddModalShow(false);
    const EditModelClose = () => setEditModalShow(false);

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <p id="manage"></p>
                <div className='table-responsive'>
                    <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Director a cargo</th>
                                <th>Descripcion breve</th>
                                <th>Estado</th>
                                <th>Tareas realizadas</th>
                                <th>Fecha asignación</th>
                                <th>Fecha finalizacion</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {works.map((work) => (
                                <tr key={work.idObra}>
                                    <td>{work.idObra}</td>
                                    <td>{work.nombre}</td>
                                    <td>{work.tipo}</td>
                                    <td>{work.idDirector}</td>
                                    <td>{work.descripcion}</td>
                                    <td>{work.estado}</td>
                                    <td>{work.porcentajeTareasRealizadas}</td>
                                    <td>{work.fechaInicio}</td>
                                    <td>{work.fechaFin}</td>
                                    <td>
                                        <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, work.idObra)}>
                                            <RiDeleteBin5Line />
                                        </Button>
                                        <span>&nbsp;&nbsp;&nbsp;</span>
                                        <Button className="mr-2" onClick={(event) => handleUpdate(event, work)}>
                                            <FaEdit />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <ButtonToolbar>
                    <Button variant="primary" onClick={handleAdd}>
                        Registrar obra
                    </Button>
                </ButtonToolbar>
                <AddWorkModal show={addModalShow} setUpdated={setIsUpdated} onHide={AddModelClose} />
                <UpdateWorkModal show={editModalShow} work={editWork} setUpdated={setIsUpdated} onHide={EditModelClose} />
            </div>
        </div>
    );
};

export default ManageWorks;
