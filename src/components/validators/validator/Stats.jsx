import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import StatsItemFlex from '../../styled/StatsItemFlex';
import BreakTxt from '../../styled/BreakTxt';
import { Green, Blue } from '../../styled/TxtColors';
import { formatNum, formatToken } from '../../../utils';
import useRequest from '../../../hooks/useRequest';
import API from '../../../api';

const StatsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Stats = () => {
  const { address } = useParams();
  const { resp } = useRequest(API.getValidatorStats, address);

  return (
    <Card>
      <Card.Body>
        {resp && (
          <StatsWrap>
            <StatsItemFlex>
              <TitleMinor>Proposed blocks: </TitleMinor>
              <BreakTxt>
                <Green>{formatNum(resp.proposed)}</Green>
              </BreakTxt>
            </StatsItemFlex>
            <StatsItemFlex>
              <TitleMinor>ATOM generated in hub-3: </TitleMinor>
              <BreakTxt>
                <Blue>{formatToken(resp.revenue)}</Blue>
              </BreakTxt>
            </StatsItemFlex>
          </StatsWrap>
        )}
      </Card.Body>
    </Card>
  );
};

export default Stats;
