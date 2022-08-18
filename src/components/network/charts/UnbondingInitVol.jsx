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
const areaName = 'Initiated unbonding volume';
const defaultPeriod = periodOpts[2];

const UnbondingInitVol = () => {
  const theme = useContext(ThemeContext);
  const coin = useCoinFormatter();
  const color = theme.danger;
  const res = useRequest(API.getUndelegationVol, defaultPeriod.value);
  const chartName = `Initiated unbonding per day/hour volume (${coin})`;
  const undelegationVolComp = useMemo(
    () => formatBarChartData(res.resp),
    [res],
  );

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
          data={undelegationVolComp}
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

export default UnbondingInitVol;
