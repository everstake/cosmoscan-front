import React from 'react';
import { Col } from 'react-bootstrap';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import TopStatus from '../../components/governance/proposal/TopStatus';
import VotingChart from '../../components/governance/proposal/VotingChart';
import Stats from '../../components/governance/proposal/Stats';

const Proposal = () => (
  <Container>
    <TopStatus />
    <Row>
      <Col xl={6}>
        <VotingChart />
      </Col>
      <Col xl={6}>
        <Stats />
      </Col>
    </Row>
    <div>Proposal</div>
  </Container>
);

export default Proposal;
