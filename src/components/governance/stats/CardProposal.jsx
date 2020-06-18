import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css, ThemeContext } from 'styled-components';
import Card from '../../styled/Card';
import TitleChart from '../../styled/TitleChart';
import TitleMinor from '../../styled/TitleMinor';
import BreakTxt from '../../styled/BreakTxt';
import PieChart from '../../chart-types/PieChart';
import {
  noString, formatNum, formatPercentValue, formatDays, formatATOM, formatPercentDec2,
} from '../../../utils';

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

const CardProposal = ({ proposal }) => {
  const theme = useContext(ThemeContext);
  const {
    id,
    status,
    title,
    proposer,
    total_deposits: deposits,
    votes_yes: yes,
    votes_no: no,
    votes_no_with_veto: veto,
    votes_abstain: abstain,
  } = proposal;
  const totalATOMVoted = Number(yes) + Number(no) + Number(veto) + Number(abstain);
  const votingChartData = [
    { value: (Number(yes) * 100) / totalATOMVoted, title: 'Yes' },
    { value: (Number(no) * 100) / totalATOMVoted, title: 'No' },
    { value: (Number(veto) * 100) / totalATOMVoted, title: 'No with veto' },
    { value: (Number(abstain) * 100) / totalATOMVoted, title: 'Abstain' },
  ];

  return (
    <Card modifiers="height100">
      <Card.Header>
        <Flex>
          <div>
            <TitleChart as="span">
              {`# ${id} `}
            </TitleChart>
          </div>
          <Status status={status}>
            {status}
          </Status>
        </Flex>
      </Card.Header>

      <Card.Body>
        <div>
          <TitleMinor as="span">
            Title:
          </TitleMinor>
          <BreakTxt className="ml-1">
            {noString(title)}
          </BreakTxt>
        </div>

        <div>
          <TitleMinor as="span">
            Proposer:
          </TitleMinor>
          <BreakTxt className="ml-1">
            {noString(proposer)}
          </BreakTxt>
        </div>

        <StatsGrid>
          <div>
            <div className="mb-1">
              <TitleMinor className="mb-0">
                Number of voters:
              </TitleMinor>
              <div>
                {formatNum(deposits)}
              </div>
            </div>

            <div className="mb-1">
              <TitleMinor className="mb-0">
                Amount of ATOM voted:
              </TitleMinor>
              <div>
                {formatATOM(totalATOMVoted)}
              </div>
            </div>

            <div className="mb-1">
              <TitleMinor className="mb-0">
                Participation rate:
              </TitleMinor>
              <div>
                {formatPercentValue(76)}
              </div>
            </div>

            <div className="mb-1">
              <TitleMinor className="mb-0">
                Quorum reached in:
              </TitleMinor>
              <div>
                {formatDays(76)}
              </div>
            </div>
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
              cellColors={[theme.blue, theme.danger, theme.burgundy, theme.grey]}
              growOnMobile={false}
            />
          </div>
        </StatsGrid>
      </Card.Body>
    </Card>
  );
};

CardProposal.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

export default CardProposal;
