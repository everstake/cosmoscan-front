import React from 'react';
import styled from 'styled-components';
import { Container } from '../../components/styled/CustomBsGrid';
import Card from '../../components/styled/Card';
import TitleMinor from '../../components/styled/TitleMinor';
import BreakTxt from '../../components/styled/BreakTxt';

const Row = styled.div`
  display: flex;
  gap: 20px;
`;
const Title = styled.h5`
  margin: 0;
`;

const BlockDetails = () => {
  return (
    <Container>
      <Card>
        <Card.Header>
          <Title>Block Details</Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <TitleMinor as="sapn">Name:</TitleMinor>
            <BreakTxt>100</BreakTxt>
          </Row>
        </Card.Body>
        <Card.Body>
          <Row>
            <TitleMinor as="sapn">Name:</TitleMinor>
            <BreakTxt>100</BreakTxt>
          </Row>
        </Card.Body>
        <Card.Body>
          <Row>
            <TitleMinor as="sapn">Name:</TitleMinor>
            <BreakTxt>100</BreakTxt>
          </Row>
        </Card.Body>
        <Card.Body>
          <Row>
            <TitleMinor as="sapn">Name:</TitleMinor>
            <BreakTxt>100</BreakTxt>
          </Row>
        </Card.Body>
        <Card.Body>
          <Row>
            <TitleMinor as="sapn">Name:</TitleMinor>
            <BreakTxt>100</BreakTxt>
          </Row>
        </Card.Body>
        <Card.Body>
          <Row>
            <TitleMinor as="sapn">Name:</TitleMinor>
            <BreakTxt>100</BreakTxt>
          </Row>
        </Card.Body>
        <Card.Body>
          <Row>
            <TitleMinor as="sapn">Name:</TitleMinor>
            <BreakTxt>100</BreakTxt>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlockDetails;
