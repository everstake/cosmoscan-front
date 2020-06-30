import React from 'react';
import { Col } from 'react-bootstrap';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import ValidatorsTable from '../../components/validators/ValidatorsTable';

const Stats = () => (
  <Container>
    <Row>
      <Col>
        <ValidatorsTable />
      </Col>
    </Row>
  </Container>
);

export default Stats;
