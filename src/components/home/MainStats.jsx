import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import WidgetStats from '../../layouts/WidgetStats';
import API from '../../api';
import {
  formatUSD, formatATOM, formatPercentValue, formatNum,
} from '../../utils';
// import Spinner from '../Spinner';

const MainStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 10px;
  
  @media(max-width: ${({ theme }) => theme.xlDown}) {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }
  
  @media(max-width: ${({ theme }) => theme.mdDown}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MainStats = () => {
  // TODO: Store and compute data correctly
  // const stats = [
  //   {
  //     title: 'Price change',
  //     mainInfo: '$2.58',
  //     extraInfo: 'Last 24 hours',
  //     // TODO: Max 11 values
  //     sparklineData: [
  //       { y: 2 },
  //       { y: 3 },
  //       { y: 4 },
  //       { y: 5 },
  //       { y: 6 },
  //       { y: 1 },
  //       { y: 10 },
  //       { y: 20 },
  //     ],
  //   },
  //   {
  //     title: 'Market cap',
  //     mainInfo: '$1,906,545,610',
  //     extraInfo: 'Last 24 hours',
  //     // TODO: Max 11 values
  //     sparklineData: [
  //       { y: 2 },
  //       { y: 3 },
  //       { y: 4 },
  //       { y: 5 },
  //       { y: 6 },
  //       { y: 1 },
  //       { y: 10 },
  //       { y: 9 },
  //     ],
  //   },
  //   {
  //     title: 'Circulating Supply',
  //     mainInfo: '$1,906,545,610',
  //   },
  //   {
  //     title: 'Trading volume',
  //     mainInfo: '106,443,219 ATOM',
  //   },
  //   {
  //     title: 'Staked ratio',
  //     mainInfo: '106,443,219 ATOM',
  //     extraInfo: 'Last 30 days',
  //     // TODO: Max 11 values
  //     sparklineData: [
  //       { y: 2 },
  //       { y: 3 },
  //       { y: 4 },
  //       { y: 5 },
  //       { y: 6 },
  //       { y: 1 },
  //       { y: 10 },
  //       { y: 20 },
  //     ],
  //   },
  //   {
  //     title: 'Current inflation rate',
  //     mainInfo: '7.00%',
  //   },
  //   {
  //     title: 'Community pool',
  //     mainInfo: '106,443',
  //   },
  //   {
  //     title: 'Top-20 stake weight',
  //     mainInfo: '10%',
  //   },
  // ];

  const [historicalState, setHistoricalState] = useState({ state: {}, isLoading: false });
  const getHistoricalState = async () => {
    try {
      setHistoricalState({ state: {}, isLoading: true });
      const resp = await API.getHistoricalState();
      setHistoricalState({ state: resp.data, isLoading: false });
    } catch (e) {
      // TODO: Implement the error handler
      console.error(e);
      setHistoricalState({ state: {}, isLoading: false });
    }
  };

  useEffect(() => {
    getHistoricalState();
  }, []);

  const transformDataForCharts = (arr) => arr.map((i) => ({
    x: i.time,
    y: Number(i.value),
  }));

  const priceAggComp = useMemo(() => {
    if (!historicalState.state.price_agg || !historicalState.state.price_agg.length) return [];

    return transformDataForCharts(historicalState.state.price_agg);
  }, [historicalState.state]);

  const marketCapAggComp = useMemo(() => {
    if (!historicalState.state.market_cap_agg
        || !historicalState.state.market_cap_agg.length) return [];

    return transformDataForCharts(historicalState.state.market_cap_agg);
  }, [historicalState.state]);

  const stakedRatio = useMemo(() => {
    if (!historicalState.state.staked_ratio
        || !historicalState.state.staked_ratio.length) return [];

    return transformDataForCharts(historicalState.state.staked_ratio);
  }, [historicalState.state]);


  return (
    <MainStatsGrid>
      {historicalState.state.current
        // ? <Spinner />
        && (
          <>
            <WidgetStats
              title="Price change"
              mainInfo={formatUSD(historicalState.state.current.price)}
              sparklineData={priceAggComp}
            />
            <WidgetStats
              title="Market cap"
              mainInfo={formatUSD(formatNum(Number(historicalState.state.current.market_cap)))}
              sparklineData={marketCapAggComp}
            />
            <WidgetStats
              title="Circulating supply"
              mainInfo={formatATOM(formatNum(Number(historicalState.state.current.circulating_supply)))}
            />
            <WidgetStats
              title="Trading volume"
              mainInfo={formatUSD(formatNum(Number(historicalState.state.current.trading_volume)))}
            />
            <WidgetStats
              title="Staked ratio"
              mainInfo={formatPercentValue(historicalState.state.current.staked_ratio)}
              sparklineData={stakedRatio}
            />
            <WidgetStats
              title="Current inflation rate"
              mainInfo={formatPercentValue(historicalState.state.current.inflation_rate)}
            />
            <WidgetStats
              title="Community pool"
              mainInfo={formatATOM(formatNum(Number(historicalState.state.current.community_pool)))}
            />
            <WidgetStats
              title="Top-20 stake weight"
              mainInfo={formatPercentValue(historicalState.state.current.top20_weight)}
            />
          </>
        )}
    </MainStatsGrid>
  );
};

export default MainStats;
