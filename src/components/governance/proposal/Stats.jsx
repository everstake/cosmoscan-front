import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import Card from '../../styled/Card';
import { Row } from '../../styled/CustomBsGrid';
import TitleMinor from '../../styled/TitleMinor';
import BreakTxt from '../../styled/BreakTxt';
import { formatATOM } from '../../../utils';

const StatsItem = styled.div`
  margin-bottom: 5px;
`;

const Stats = ({
  stats: {
    id,
    title,
    proposer,
    hash,
    type,
    submitted,
    votingStart,
    votingEnd,
    depositEnd,
    turnout,
    totalATOMVoted,
  },
}) => (
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
              {id}
            </span>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposal title:
            </TitleMinor>
            <span>
              { title }
            </span>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposer:
            </TitleMinor>
            <BreakTxt>
              {proposer}
            </BreakTxt>
          </StatsItem>
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposal hash:
            </TitleMinor>
            <BreakTxt>
              {hash}
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
              {type}
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
              {submitted}
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
              { `${submitted} - ${depositEnd}` }
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
              { `${votingStart} - ${votingEnd}` }
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
            <span>{turnout}</span>
          </StatsItem>
          <StatsItem>
            <span>{formatATOM(totalATOMVoted)}</span>
          </StatsItem>
        </Col>

        <Col />
      </Row>
    </Card.Footer>
  </Card>
);

Stats.propTypes = {
  stats: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    proposer: PropTypes.string,
    hash: PropTypes.string,
    type: PropTypes.string,
    submitted: PropTypes.string,
    votingStart: PropTypes.string,
    votingEnd: PropTypes.string,
    depositEnd: PropTypes.string,
    turnout: PropTypes.string,
  }),
};
Stats.defaultProps = {
  stats: {
    id: '-----',
    title: '-----',
    proposer: '-----',
    hash: '-----',
    type: '-----',
    submitted: '-----',
    votingStart: '-----',
    votingEnd: '-----',
    depositEnd: '-----',
    turnout: '-----',
  },
};

export default Stats;
