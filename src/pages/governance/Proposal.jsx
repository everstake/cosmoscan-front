import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import TopStatus from '../../components/governance/proposal/TopStatus';
import VotingChart from '../../components/governance/proposal/VotingChart';
import Stats from '../../components/governance/proposal/Stats';
import Description from '../../components/governance/proposal/Description';
import VotingTable from '../../components/governance/proposal/VotingTable';

const DescriptionStyled = styled(Description)`
  margin-top: 10px;
`;

const VotingTableStyled = styled(VotingTable)`
  margin-top: ${({ theme: { marginSectionsStandard } }) => marginSectionsStandard};
`;

const Proposal = () => (
  <Container>
    <section>
      <TopStatus />
      <Row>
        <Col xl={6}>
          <VotingChart />
        </Col>
        <Col xl={6}>
          <Stats />
        </Col>
      </Row>
      <DescriptionStyled />
    </section>
    <VotingTableStyled />
  </Container>
);

export default Proposal;
