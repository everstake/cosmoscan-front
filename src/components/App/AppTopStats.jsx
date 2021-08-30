import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import useRequest from '../../hooks/useRequest';
import API from '../../api';
import {
  noString,
  formatNum,
  formatUSD,
  formatSec,
  formatPercentDec,
} from '../../utils';
// import Spinner from '../Spinner';
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
  z-index: 4;

  @media (max-width: ${({ theme }) => theme.xlDown}) {
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

  @media (max-width: ${({ theme }) => theme.xlDown}) {
    flex: 1 0 230px;
  }

  @media (max-width: ${({ theme }) => theme.lgDown}) {
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

const statTitles = {
  height: 'Block height',
  latest_validator: 'Latest validator',
  latest_proposal: 'Latest proposal',
  validator_avg_fee: 'Avg validator fee',
  block_time: 'Block time',
  current_price: 'Current price',
};
const transformMetaStats = (stats) => {
  if (!stats || !Object.keys(stats).length) return [];

  return Object.keys(stats).map((stat) => ({
    title: statTitles[stat],
    value: stats[stat],
  }));
};

const AppTopStats = () => {
  const res = useRequest(API.getMetaStats, {});

  useEffect(() => {
    const interval = setInterval(() => {
      res.request();
    }, 7000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: May need rendering all the items as if there's no data,
  //  there's no way to show appropriate "no-data" stubs
  const metaStatsComp = useMemo(() => transformMetaStats(res.resp), [res.resp]);

  return (
    <TopStatsStyled>
      <Container>
        <TopStatsContainer>
          {/* eslint-disable-next-line no-nested-ternary */}
          {
            // res.isLoading
            // ? (
            //   <div className="d-flex w-100 justify-content-center">
            //     <Spinner size={55} />
            //   </div>
            // )
            // :
            !metaStatsComp || !metaStatsComp.length ? (
              <div className="text-center w-100">-----</div>
            ) : (
              metaStatsComp.map((stat) => (
                <TopStatsItem key={stat.title}>
                  <div className="text-center">
                    <TitleMinor>{stat.title}</TitleMinor>
                    <TxtEllipsis>
                      {/* eslint-disable-next-line no-nested-ternary */}
                      {stat.title === 'Current price'
                        ? formatUSD(stat.value)
                        : // eslint-disable-next-line no-nested-ternary
                        stat.title === 'Block time'
                        ? formatSec(stat.value)
                        : // eslint-disable-next-line no-nested-ternary
                        stat.title === 'Avg validator fee'
                        ? formatPercentDec(stat.value)
                        : stat.title === 'Latest proposal'
                        ? // TODO: Refactor
                          `#${stat.value.id}: ${stat.value.name}`
                        : noString(formatNum(stat.value))}
                    </TxtEllipsis>
                  </div>
                </TopStatsItem>
              ))
            )
          }
        </TopStatsContainer>
      </Container>
    </TopStatsStyled>
  );
};

export default AppTopStats;
