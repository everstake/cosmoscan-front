import React, { useMemo } from 'react';
import styled from 'styled-components';
import useRequest from '../../hooks/useRequest';
import WidgetStats from '../../layouts/WidgetStats';
import API from '../../api';
import {
  formatUSD,
  formatToken,
  formatPercentValue,
  formatNum,
  formatChartData,
} from '../../utils';
// import Spinner from '../Spinner';

const MainStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 10px;

  @media (max-width: ${({ theme }) => theme.xlDown}) {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.mdDown}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MainStats = () => {
  const res = useRequest(API.getHistoricalState);
  const isDataNotEmpty = Boolean(res.resp);

  const priceAggComp = useMemo(() => {
    if (!isDataNotEmpty) return [];

    return formatChartData(res.resp.price_agg);
  }, [res.resp, isDataNotEmpty]);

  const marketCapAggComp = useMemo(() => {
    if (!isDataNotEmpty) return [];

    return formatChartData(res.resp.market_cap_agg);
  }, [res.resp, isDataNotEmpty]);

  const stakedRatio = useMemo(() => {
    if (!isDataNotEmpty) return [];

    return formatChartData(res.resp.staked_ratio);
  }, [res.resp, isDataNotEmpty]);

  return (
    <MainStatsGrid>
      {isDataNotEmpty && res.resp.current && (
        // ? <Spinner />
        <>
          <WidgetStats
            title="Price change"
            mainInfo={formatUSD(res.resp.current.price)}
            sparklineData={priceAggComp}
          />
          <WidgetStats
            title="Market cap"
            mainInfo={formatUSD(formatNum(Number(res.resp.current.market_cap)))}
            sparklineData={marketCapAggComp}
          />
          <WidgetStats
            title="Circulating supply"
            mainInfo={formatToken(
              formatNum(Number(res.resp.current.circulating_supply)),
            )}
          />
          <WidgetStats
            title="Trading volume"
            mainInfo={formatUSD(
              formatNum(Number(res.resp.current.trading_volume)),
            )}
          />
          <WidgetStats
            title="Bonded ratio"
            mainInfo={formatPercentValue(res.resp.current.staked_ratio)}
            sparklineData={stakedRatio}
          />
          <WidgetStats
            title="Current inflation rate"
            mainInfo={formatPercentValue(res.resp.current.inflation_rate)}
          />
          <WidgetStats
            title="Community pool"
            mainInfo={formatToken(
              formatNum(Number(res.resp.current.community_pool)),
            )}
          />
          <WidgetStats
            title="Top-20 voting power"
            mainInfo={formatPercentValue(res.resp.current.top20_weight)}
          />
        </>
      )}
    </MainStatsGrid>
  );
};

export default MainStats;
