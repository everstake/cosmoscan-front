import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import Card from '../../styled/Card';
import { Row } from '../../styled/CustomBsGrid';
import TitleMinor from '../../styled/TitleMinor';
import BreakTxt from '../../styled/BreakTxt';
import { formatATOM, noString } from '../../../utils';

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
              {noString(id)}
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
              {noString(title)}
            </span>
          </StatsItem>
          {proposer && (
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposer:
            </TitleMinor>
            <BreakTxt>
              {noString(proposer)}
            </BreakTxt>
          </StatsItem>
          )}
          {hash && (
          <StatsItem>
            <TitleMinor
              as="span"
              className="mb-0 mr-1"
            >
              Proposal hash:
            </TitleMinor>
            <BreakTxt>
              {noString(hash)}
            </BreakTxt>
          </StatsItem>
          )}
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
              {noString(type)}
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
              {noString(submitted)}
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
              { `${noString(submitted)} - ${noString(depositEnd)}` }
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
              { `${noString(votingStart)} - ${noString(votingEnd)}` }
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
            <span>{noString(turnout)}</span>
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
    totalATOMVoted: PropTypes.number,
  }),
};
Stats.defaultProps = {
  stats: {
    id: '-----',
    title: '-----',
    proposer: '',
    hash: '-----',
    type: '-----',
    submitted: '-----',
    votingStart: '-----',
    votingEnd: '-----',
    depositEnd: '-----',
    turnout: '-----',
    totalATOMVoted: 0,
  },
};

export default Stats;
