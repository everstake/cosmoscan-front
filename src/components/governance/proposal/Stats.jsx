import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Card from '../../styled/Card';
import { Row } from '../../styled/CustomBsGrid';
import TitleMinor from '../../styled/TitleMinor';
import BreakTxt from '../../styled/BreakTxt';
import StatsItem from '../../styled/StatsItem';
import { formatToken, noString } from '../../../utils';
import Store from '../../../store';

const Stats = ({
  stats: {
    id,
    title,
    proposer,
    proposerAddress,
    hash,
    type,
    submitted,
    votingStart,
    votingEnd,
    depositEnd,
    turnout,
    totalATOMVoted,
  },
}) => {
  const { chain } = useContext(Store);
  return (
    <Card modifiers="height100">
      <Card.Body>
        <Row>
          <Col>
            <StatsItem>
              <TitleMinor as="span" className="mb-0 mr-1">
                Proposal number:
              </TitleMinor>
              <span>{noString(id)}</span>
            </StatsItem>
            <StatsItem>
              <TitleMinor as="span" className="mb-0 mr-1">
                Proposal title:
              </TitleMinor>
              <span>{noString(title)}</span>
            </StatsItem>
            {proposer && (
              <StatsItem>
                <TitleMinor as="span" className="mb-0 mr-1">
                  Proposer:
                </TitleMinor>
                <BreakTxt>
                  {proposer.length !== 45 ? (
                    <NavLink
                      exact
                      to={`/${chain.value}/validator/${proposerAddress}`}
                    >
                      {noString(proposer)}
                    </NavLink>
                  ) : (
                    noString(proposer)
                  )}
                </BreakTxt>
              </StatsItem>
            )}
            {hash && (
              <StatsItem>
                <TitleMinor as="span" className="mb-0 mr-1">
                  Proposal hash:
                </TitleMinor>
                <BreakTxt>{noString(hash)}</BreakTxt>
              </StatsItem>
            )}
          </Col>

          <Col>
            <StatsItem>
              <TitleMinor as="span" className="mb-0 mr-1">
                Type:
              </TitleMinor>
              <span>{noString(type)}</span>
            </StatsItem>
            <StatsItem>
              <TitleMinor as="span" className="mb-0 mr-1">
                Submitted on:
              </TitleMinor>
              <span>{noString(submitted)}</span>
            </StatsItem>
            <StatsItem>
              <TitleMinor as="span" className="mb-0 mr-1">
                Deposit period:
              </TitleMinor>
              <span>{`${noString(submitted)} - ${noString(depositEnd)}`}</span>
            </StatsItem>
            <StatsItem>
              <TitleMinor as="span" className="mb-0 mr-1">
                Voting period:
              </TitleMinor>
              <span>{`${noString(votingStart)} - ${noString(votingEnd)}`}</span>
            </StatsItem>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer>
        <Row>
          <Col>
            <StatsItem>
              <TitleMinor as="span" className="mb-0 mr-1">
                Turnout:
              </TitleMinor>
              <span>{noString(turnout)}</span>
            </StatsItem>
            <StatsItem>
              <span>{formatToken(totalATOMVoted)}</span>
            </StatsItem>
          </Col>

          <Col />
        </Row>
      </Card.Footer>
    </Card>
  );
};

Stats.propTypes = {
  stats: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    proposer: PropTypes.string,
    proposerAddress: PropTypes.string,
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
    proposerAddress: '',
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
