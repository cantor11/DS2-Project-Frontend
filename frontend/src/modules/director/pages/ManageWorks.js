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
    const [editWork, setEditWork] = useState([]);
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
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, works])
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
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                },
                (error) => {
                    alert("Failed to Delete Work");
                })
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
                            <th>Id</th>
                            <th>Nombre de la Obra</th>
                            <th>Ubicación</th>
                            <th>Director</th>
                            <th>Tipo de Obra</th>
                            <th>Capataz</th>
                            <th>Peones</th>
                            <th>Ayudantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {works.map((work) =>
                            <tr key={work.id}>
                                <td>{work.id}</td>
                                <td>{work.name}</td>
                                <td>{work.location}</td>
                                <td>{work.director}</td>
                                <td>{work.type}</td>
                                <td>{`Director: ${work.personnel.director}, Capataz: ${work.personnel.capataz}, Peones: ${work.personnel.peones}, Ayudantes: ${work.personnel.ayudantes}`}</td>
                                <td>
                                    <Button className="mr-2" variant="danger"
                                        onClick={event => handleDelete(event, work.id)}>
                                        <RiDeleteBin5Line />
                                    </Button>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Button className="mr-2"
                                        onClick={event => handleUpdate(event, work)}>
                                        <FaEdit />
                                    </Button>
                                    <UpdateWorkModal show={editModalShow} work={editWork} setUpdated={setIsUpdated}
                                        onHide={EditModelClose}></UpdateWorkModal>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                </div>
                <ButtonToolbar>
                    <Button variant="primary" onClick={handleAdd}>
                        Registrar obra
                    </Button>
                    <AddWorkModal show={addModalShow} setUpdated={setIsUpdated}
                        onHide={AddModelClose}></AddWorkModal>
                </ButtonToolbar>
            </div>
        </div>
    );
};
export default ManageWorks;