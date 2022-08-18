import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import { periodOpts } from '../../../utils/constants';
import {
  formatBarChartData,
  formatDate,
  formatDateWithTime,
  formatSeconds,
} from '../../../utils';
import API from '../../../api';
import BarChart from '../../chart-types/BarChart';

const chartName = 'Block delay';
const yAxisWidth = 80;
const yTickCount = 10;
const areaName = chartName;
const defaultPeriod = periodOpts[2];

const BlockDelay = () => {
  const theme = useContext(ThemeContext);
  const color = theme.navyBlue;
  const res = useRequest(API.getBlockDelay, defaultPeriod.value);
  const blockDelayComp = useMemo(() => formatBarChartData(res.resp), [res]);

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
          barName={areaName}
          isLoading={res.isLoading}
          data={blockDelayComp}
          yAxisLabelsFormatter={formatSeconds}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatSeconds}
          tooltipLabelFormatter={formatDateWithTime}
          barColor={color}
        />
      }
    />
  );
};

export default BlockDelay;
