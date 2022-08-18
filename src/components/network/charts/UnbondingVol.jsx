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

const yAxisWidth = 70;
const yTickCount = 10;
const areaName = 'Unbonding volume';
const defaultPeriod = periodOpts[2];

const UnbondingVol = () => {
  const theme = useContext(ThemeContext);
  const coin = useCoinFormatter();
  const color = theme.dangerDark;
  const res = useRequest(API.getUnbondingVol, defaultPeriod.value);
  const chartName = `Unbonding per day/hour volume (${coin})`;
  const unbondingVol = useMemo(() => formatBarChartData(res.resp), [res]);

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
          data={unbondingVol}
          yAxisLabelsFormatter={formatTokenAmount}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          yAxisDomain={[
            (dataMin) => Math.round(dataMin),
            (dataMax) => Math.round(dataMax),
          ]}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatToken}
          tooltipLabelFormatter={formatDateWithTime}
          barColor={color}
        />
      }
    />
  );
};

export default UnbondingVol;
