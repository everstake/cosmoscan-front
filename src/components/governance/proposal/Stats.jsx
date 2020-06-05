import React from 'react';
import { Col } from 'react-bootstrap';
import Card from '../../styled/Card';
import { Row } from '../../styled/CustomBsGrid';
import TitleMinor from '../../styled/TitleMinor';
import BreakTxt from '../../styled/BreakTxt';
import styled from 'styled-components';

const StatsItem = styled.div`
  margin-bottom: 5px;
`;

const Stats = () => (
  <Card modifiers="height100">
    <Card.Body>
      <Row>
        <Col>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposal number:
            </TitleMinor>
            <span>
            26
          </span>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposal name:
            </TitleMinor>
            <span>
            Some name
          </span>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposer:
            </TitleMinor>
            <span>
            Some proposer
          </span>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposal hash:
            </TitleMinor>
            <BreakTxt>
              hashhashhashhashhashhashhash
            </BreakTxt>
          </StatsItem>
        </Col>

        <Col>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Type:
            </TitleMinor>
            <span>
            some type
          </span>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Submitted on:
            </TitleMinor>
            <span>
            { new Date().getFullYear() }
          </span>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Deposit period:
            </TitleMinor>
            <span>
            { new Date().getFullYear() }
          </span>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Voting period:
            </TitleMinor>
            <span>
            { new Date().getFullYear() }
          </span>
          </StatsItem>
        </Col>
      </Row>
    </Card.Body>

    <Card.Footer>
      <Row>
        <Col>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Turnout:
            </TitleMinor>
            <span>n%</span>
          </StatsItem>
          <StatsItem>
            <span>222,222 / 223 331 ATOM</span>
          </StatsItem>
        </Col>

        <Col>

        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

export default Stats;
