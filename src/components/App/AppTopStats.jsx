import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import API from '../../api';
import {
  noString, formatNum, formatUSD, formatSec, formatPercentValue, formatPercentFee
} from '../../utils';
import Spinner from '../Spinner';
import { Container } from '../styled/CustomBsGrid';
import TitleMinor from '../styled/TitleMinor';

const TopStatsStyled = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.heightHeader};
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.shadow};
  padding-top: 5px;
  padding-bottom: 5px;
  z-index: 2;
  
  @media(max-width: ${({ theme }) => theme.xlDown}) {
    position: relative;
    top: initial;
  }
`;

const TopStatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -5px;
  align-items: center;
`;

const TopStatsItem = styled.div`
  flex: 1 0 150px;
  margin: 5px;
  
  @media(max-width: ${({ theme }) => theme.xlDown}) {
    flex: 1 0 230px;
  }
  
  @media(max-width: ${({ theme }) => theme.lgDown}) {
    flex: 1 0 220px;
  }
`;

// TODO: Extract if reused.
const TxtEllipsis = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  display: inline-block;
`;

const AppTopStats = () => {
  // TODO: Store and compute data correctly
  const statTitles = {
    height: 'Block height',
    latest_validator: 'Latest validator',
    latest_proposal: 'Latest proposal',
    validator_avg_fee: 'Validator fee',
    block_time: 'Block time',
    current_price: 'Current price',
  };
  // TODO: Refactor meta stats computation
  // const statTitles = {
  //   height: {
  //     title: 'Block height',
  //     formatFunc: formatNum,
  //   },
  //   latest_validator: {
  //     title: 'Latest validator',
  //     formatFunc: noString,
  //   },
  //   latest_proposal: {
  //     title: 'Latest proposal',
  //     formatFunc: noString,
  //   },
  //   validator_avg_fee: {
  //     title: 'Validator fee',
  //     formatFunc: formatATOM,
  //   },
  //   block_time: {
  //     title: 'Block time',
  //     formatFunc: formatSeconds,
  //   },
  //   current_price: {
  //     title: 'Current price',
  //     formatFunc: formatUSD,
  //   },
  // };
  const [metaStatsState, setMetaStatsState] = useState({ metaStats: {}, isLoading: false });
  const getMetaStats = async () => {
    try {
      setMetaStatsState({ metaStats: {}, isLoading: true });
      const resp = await API.getMetaStats();
      setMetaStatsState({ metaStats: resp.data, isLoading: false });
    } catch (e) {
      // TODO: Implement the error handler
      console.error(e);
      setMetaStatsState({ metaStats: {}, isLoading: false });
    }
  };

  useEffect(() => {
    getMetaStats();
  }, []);

  const metaStatsComputed = useMemo(() => Object.keys(metaStatsState.metaStats).map((stat) => ({
    title: statTitles[stat],
    value: metaStatsState.metaStats[stat],
  })), [metaStatsState.metaStats, statTitles]);

  return (
    <TopStatsStyled>
      <Container>
        <TopStatsContainer>
          {metaStatsState.isLoading
            ? (
              <div className="d-flex w-100 justify-content-center">
                <Spinner size={55} />
              </div>
            )
            : metaStatsComputed.map((stat) => (
              <TopStatsItem key={stat.title}>
                <div className="text-center">
                  <TitleMinor>
                    { stat.title }
                  </TitleMinor>
                  <TxtEllipsis>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    { stat.title === 'Current price'
                      ? formatUSD(stat.value)
                      // eslint-disable-next-line no-nested-ternary
                      : stat.title === 'Block time'
                        ? formatSec(stat.value)
                        : stat.title === 'Validator fee'
                          ? formatPercentFee(stat.value)
                          : noString(formatNum(stat.value)) }
                  </TxtEllipsis>
                </div>
              </TopStatsItem>
            ))}
        </TopStatsContainer>
      </Container>
    </TopStatsStyled>
  );
};

export default AppTopStats;
