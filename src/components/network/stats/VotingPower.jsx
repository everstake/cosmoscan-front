import React, { useMemo } from 'react';
import useRequest from '../../../hooks/useRequest';
import ChartContainer from '../../../layouts/ChartContainer';
import PieChart from '../../chart-types/PieChart';
import { formatPercentDec2 } from '../../../utils';
import API from '../../../api';

const chartTitle = 'Voting power';
const labelFormatter = (entry) => formatPercentDec2(entry.value);

const VotingPower = () => {
  const res = useRequest(API.getVotingPower);
  const data = useMemo(() => {
    if (!res || !res.resp) return [];
    const total = Number(res.resp.total);

    return res.resp.parts.map((el) => ({
      ...el,
      value: (+el.value * 100) / total,
    }));
  }, [res]);

  return (
    <ChartContainer
      title={chartTitle}
      chart={
        <PieChart
          isLoading={res.isLoading}
          data={data}
          valFormatter={formatPercentDec2}
          labelFormatter={labelFormatter}
          height={400}
          isAnimationActive={false}
        />
      }
    />
  );
};

export default VotingPower;
