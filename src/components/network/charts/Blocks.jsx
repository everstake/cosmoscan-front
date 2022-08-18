import React, { useMemo } from 'react';
import useRequest from '../../../hooks/useRequest';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import { periodOpts } from '../../../utils/constants';
import {
  formatNum,
  formatDate,
  formatDateWithTime,
  formatBarChartData,
} from '../../../utils';
import API from '../../../api';
import BarChart from '../../chart-types/BarChart';

const chartName = '# of blocks per day/hour';
const yAxisWidth = 50;
const yTickCount = 10;
const areaName = '# of blocks';
const defaultPeriod = periodOpts[2];

const Blocks = () => {
  const res = useRequest(API.getBlocks, defaultPeriod.value);
  const blocksComp = useMemo(() => formatBarChartData(res.resp), [res]);

  return (
    <ChartContainer
      title={chartName}
      select={
        <SelectPeriod
          defaultPeriod={defaultPeriod}
          isDisabled={res.isLoading}
          onChange={res.request}
        />
      }
      chart={
        <BarChart
          data={blocksComp}
          barName={areaName}
          isLoading={res.isLoading}
          yAxisLabelsFormatter={formatNum}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatNum}
          tooltipLabelFormatter={formatDateWithTime}
        />
      }
    />
  );
};

export default Blocks;
