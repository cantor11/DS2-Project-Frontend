import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';

const TextReports = ({ works }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Reportes de Obras - Formato de Texto</h2>
          <Table striped bordered hover>
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
        </Col>
      </Row>
    </Container>
  );
};

export default TextReports;

