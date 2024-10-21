import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';

const TextReports = ({ works }) => {
  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <div className="table-responsive">
          <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {works && works.map((work) => (
                <tr key={work.id}>
                  <td>{work.id}</td>
                  <td>{work.name}</td>
                  <td>{work.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TextReports;

