import React, { useMemo } from 'react';
import ChartContainer from '../../../layouts/ChartContainer';
import BarChart from '../../chart-types/BarChart';
import { formatNum } from '../../../utils';
import useRequest from '../../../hooks/useRequest';
import API from '../../../api';


const chartName = 'Blocks proposed';
const barName = chartName;
const yAxisWidth = 50;
const yAxisTickCount = 10;
const xAxisTickFormatter = (val) => val;
const tooltipLabelFormatter = xAxisTickFormatter;


const BlocksProposed = () => {
  const { resp, isLoading } = useRequest(API.getBlocksProposed);
  const blocksProposed = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.map((el) => ({
      name: el.validator,
      dataPiece: el.value,
    })).sort((a, b) => a.dataPiece - b.dataPiece);
  }, [resp]);

  return (
    <ChartContainer
      title={chartName}
      chart={(
        <BarChart
          isLoading={isLoading}
          data={blocksProposed}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yAxisTickCount}
          yAxisLabelsFormatter={formatNum}
          xAxisTickFormatter={xAxisTickFormatter}
          yAxisDomain={['dataMin', 'dataMax']}
          tooltipLabelFormatter={tooltipLabelFormatter}
          tooltipFormatter={formatNum}
          barName={barName}
        />
      )}
    />
  );
};

export default BlocksProposed;
