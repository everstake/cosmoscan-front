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

const yAxisWidth = 60;
const yTickCount = 10;
const areaName = 'Delegations volume';
const defaultPeriod = periodOpts[2];

const DelegationVol = () => {
  const theme = useContext(ThemeContext);
  const color = theme.success;
  const res = useRequest(API.getDelegationVol, defaultPeriod.value);
  const coin = useCoinFormatter();
  const chartName = `Delegations per day/hour volume (${coin})`;
  const delegationVolComp = useMemo(() => formatBarChartData(res.resp), [res]);

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
          data={delegationVolComp}
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

export default DelegationVol;
