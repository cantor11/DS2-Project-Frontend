import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAllWorks } from '../../../api/WorkApi';
import '../../../App.css';


const Works = () => {
    const [works, setWorks] = useState([]);

    useEffect(() => {
        let mounted = true;
        const fetchWorks = async () => {
            try {
                const data = await getAllWorks();
                if (mounted && data) {
                    setWorks(data);
                }
            } catch (error) {
                console.error("Error fetching works:", error);
            }
        };
        fetchWorks();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <p id="before-table"></p>
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
                        {works.length > 0 ? (
                            works.map((work, index) => (
                                <tr key={work.id}>
                                    <td>{work.id}</td>
                                    <td>{work.name}</td>
                                    <td>{work.location}</td>
                                    <td>{work.director}</td>
                                    <td>{work.workType}</td>
                                    <td>{work.foreman}</td>
                                    <td>{work.laborers}</td>
                                    <td>{work.helpers}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-secondary" colSpan="8">No se encuentran obras activas</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                </div>
            </div>
        </div>
    );
};

export default Works;