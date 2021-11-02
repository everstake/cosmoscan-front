import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import AreaChart from '../../chart-types/AreaChart';
import { periodOpts } from '../../../utils/constants';
import {
  formatToken,
  formatTokenAmount,
  formatDate,
  formatDateWithTime,
} from '../../../utils';
import API from '../../../api';
import useCoinFormatter from '../../../hooks/useCoinFormatter';

const yAxisWidth = 40;
const yTickCount = 10;
const areaName = 'Fee volume';
const defaultPeriod = periodOpts[2];

const FeeVol = () => {
  const theme = useContext(ThemeContext);
  const coin = useCoinFormatter();
  const color = theme.blue5;
  const res = useRequest(API.getFeeVol, defaultPeriod.value);
  const feeVolComp = useChartFormatter(res.resp);
  const chartName = `Fee volume (${coin})`;

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
        <AreaChart
          areaName={areaName}
          isLoading={res.isLoading}
          data={feeVolComp}
          yAxisLabelsFormatter={formatTokenAmount}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatToken}
          tooltipLabelFormatter={formatDateWithTime}
          color={color}
        />
      }
    />
  );
};

export default FeeVol;
