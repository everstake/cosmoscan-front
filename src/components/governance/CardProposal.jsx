import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css, ThemeContext } from 'styled-components';
import { NavLink } from 'react-router-dom';
import Card from '../styled/Card';
import TitleChart from '../styled/TitleChart';
import TitleMinor from '../styled/TitleMinor';
import BreakTxt from '../styled/BreakTxt';
import PieChart from '../chart-types/PieChart';
import Sparkline from '../chart-types/Sparkline';
import {
  noString,
  formatNum,
  formatPercentValue,
  formatToken,
  formatPercentDec2,
  formatChartData,
} from '../../utils';
import useCoinFormatter from '../../hooks/useCoinFormatter';

const Status = styled.div`
  ${({ status, theme: { success, danger } }) => css`
    color: ${status === 'Rejected' ? danger : success};
    text-align: right;
    font-weight: 700;
  `}
`;
const StatsGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavLinkStyled = styled(NavLink)`
  cursor: pointer;
  font-weight: 400;
  transition: transform 0.2s;

  &:hover {
    text-decoration: none;
    color: initial;
    transform: translateY(-5px);
  }
`;

const CardProposal = ({ proposal }) => {
  const theme = useContext(ThemeContext);
  const coin = useCoinFormatter();

  const {
    id,
    status,
    title,
    proposer,
    voters,
    votes_yes: yes,
    votes_no: no,
    votes_no_with_veto: veto,
    votes_abstain: abstain,
    participation_rate: partRate,
    activity,
    turnout,
  } = proposal;
  const totalATOMVoted =
    Number(yes) + Number(no) + Number(veto) + Number(abstain);
  const votingChartData = [
    { value: (Number(yes) * 100) / totalATOMVoted, title: 'Yes' },
    { value: (Number(no) * 100) / totalATOMVoted, title: 'No' },
    { value: (Number(veto) * 100) / totalATOMVoted, title: 'No with veto' },
    { value: (Number(abstain) * 100) / totalATOMVoted, title: 'Abstain' },
  ];
  const activityComp = useMemo(() => {
    if (!activity || !activity.length) return [];

    return formatChartData(activity);
  }, [activity]);
  return (
    <Card modifiers="height100" as={NavLinkStyled} to={`proposal/${id}`}>
      <Card.Header>
        <Flex>
          <div>
            <TitleChart as="span">{`# ${id} `}</TitleChart>
          </div>
          <Status status={status}>{status}</Status>
        </Flex>
      </Card.Header>

      <Card.Body>
        <div>
          <TitleMinor as="span">Title:</TitleMinor>
          <BreakTxt className="ml-1">{noString(title)}</BreakTxt>
        </div>

        {proposer && (
          <div>
            <TitleMinor as="span">Proposer:</TitleMinor>
            <BreakTxt className="ml-1">{noString(proposer)}</BreakTxt>
          </div>
        )}

        <StatsGrid>
          <div>
            {/* TODO: Define why the value is not converted to bool */}
            {Boolean(voters) && (
              <div className="mb-1">
                <TitleMinor className="mb-0">Number of voters:</TitleMinor>
                <div>
                  {/* {voters ? `${formatNum(voters)}(${formatPercentValue(partRate)})` : '-----'} */}
                  {`${formatNum(voters)}(${formatPercentValue(partRate)})`}
                </div>
              </div>
            )}

            <div className="mb-1">
              <TitleMinor className="mb-0">Amount of {coin} voted:</TitleMinor>
              <div>{formatToken(totalATOMVoted)}</div>
            </div>

            <div className="mb-1">
              <TitleMinor className="mb-0">Turnout:</TitleMinor>
              <div>{formatPercentValue(turnout)}</div>
            </div>

            {/* TODO: Define why the value is not converted to bool */}
            {Boolean(activityComp && activityComp.length) && (
              <div className="mb-1">
                <TitleMinor className="mb-0">Voter activity:</TitleMinor>
                {activityComp && activityComp.length ? (
                  <Sparkline data={activityComp} color={theme.success} />
                ) : (
                  '-----'
                )}
              </div>
            )}
          </div>

          <div>
            <PieChart
              data={votingChartData}
              valFormatter={formatPercentDec2}
              labelFormatter={false}
              height={200}
              minAngle={3}
              legendType="none"
              displayLegend={false}
              cellColors={[
                theme.blue,
                theme.danger,
                theme.burgundy,
                theme.grey,
              ]}
              growOnMobile={false}
            />
          </div>
        </StatsGrid>
      </Card.Body>
    </Card>
  );
};

CardProposal.propTypes = {
  proposal: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  ).isRequired,
};

export default CardProposal;
