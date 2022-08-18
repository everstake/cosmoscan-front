import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import { periodOpts } from '../../../utils/constants';
import {
  formatToken,
  formatTokenAmount,
  formatDate,
  formatDateWithTime,
  formatBarChartData,
} from '../../../utils';
import API from '../../../api';
import useCoinFormatter from '../../../hooks/useCoinFormatter';
import BarChart from '../../chart-types/BarChart';

const yAxisWidth = 40;
const yTickCount = 10;
const areaName = 'Fee volume';
const defaultPeriod = periodOpts[2];

const FeeVol = () => {
  const theme = useContext(ThemeContext);
  const coin = useCoinFormatter();
  const color = theme.blue5;
  const res = useRequest(API.getFeeVol, defaultPeriod.value);
  const chartName = `Fee volume (${coin})`;
  const feeVolComp = useMemo(() => formatBarChartData(res.resp), [res]);

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
          data={feeVolComp}
          yAxisLabelsFormatter={formatTokenAmount}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatToken}
          tooltipLabelFormatter={formatDateWithTime}
          barColor={color}
        />
      }
      // chart={
      //   <AreaChart
      //     areaName={areaName}
      //     isLoading={res.isLoading}
      //     data={feeVolComp}
      //     yAxisLabelsFormatter={formatTokenAmount}
      //     yAxisWidth={yAxisWidth}
      //     yTickCount={yTickCount}
      //     xAxisTickFormatter={formatDate}
      //     tooltipFormatter={formatToken}
      //     tooltipLabelFormatter={formatDateWithTime}
      //     color={color}
      //   />
      // }
    />
  );
};

export default FeeVol;
