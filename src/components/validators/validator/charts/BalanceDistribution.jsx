import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import ChartContainer from '../../../../layouts/ChartContainer';
import PieChart from '../../../chart-types/PieChart';
import { formatToken, formatPercentDec2 } from '../../../../utils';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';

const chartTitle = 'Balance distribution';
const formatVal = (val, total) => {
  return `${formatToken(val)}(${formatPercentDec2((val * 100) / total)})`;
};

const BalanceDistribution = () => {
  const theme = useContext(ThemeContext);
  const { address } = useParams();
  const { resp, isLoading } = useRequest(API.getBalanceDistribution, address);
  const totalBal = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return 0;

    return (
      Number(resp.other_delegated) +
      Number(resp.self_delegated) +
      Number(resp.available)
    );
  }, [resp]);
  const balDist = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return [
      { title: 'Delegated', value: Number(resp.other_delegated) },
      { title: 'Self-delegated', value: Number(resp.self_delegated) },
      { title: 'Available', value: Number(resp.available) },
    ];
  }, [resp]);

  return (
    <ChartContainer
      title={chartTitle}
      chart={
        <PieChart
          isLoading={isLoading}
          data={balDist}
          // valFormatter={formatToken}
          valFormatter={(val) => formatVal(val, totalBal)}
          labelFormatter={false}
          height={300}
          isAnimationActive={false}
          cellColors={[theme.blue, theme.violet, theme.burgundy, theme.grey]}
        />
      }
    />
  );
};

export default BalanceDistribution;
