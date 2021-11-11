import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Col } from 'react-bootstrap';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import ValidatorsTable from '../../components/validators/ValidatorsTable';

const Stats = () => (
  <Container>
    <Helmet>
      <title>Cosmos validators statistics | Cosmoscan</title>
      <meta
        name="description"
        content="Check out the list of Cosmoshub validators and their stats."
      />
      <meta
        itemProp="description"
        content="Check out the list of Cosmoshub validators and their stats."
      />
      <meta
        property="og:description"
        content="Check out the list of Cosmoshub validators and their stats."
      />
      <meta
        name="twitter:description"
        content="Check out the list of Cosmoshub validators and their stats."
      />
    </Helmet>

    <Row>
      <Col>
        <ValidatorsTable />
      </Col>
    </Row>
  </Container>
);

export default Stats;
