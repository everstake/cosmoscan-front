import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import AreaChart from '../../chart-types/AreaChart';
import { periodOpts, coinCodes } from '../../../utils/constants';
import {
  formatATOM,
  formatATOMAmount,
  formatDate,
  formatDateWithTime,
} from '../../../utils';
import API from '../../../api';
import { useChainsStateContext } from '../../../store/chainContext';

const yAxisWidth = 40;
const yTickCount = 10;
const areaName = 'Fee volume';
const defaultPeriod = periodOpts[2];

const FeeVol = () => {
  const theme = useContext(ThemeContext);
  const { chain } = useChainsStateContext();
  const color = theme.blue5;
  const res = useRequest(API.getFeeVol, defaultPeriod.value);
  const feeVolComp = useChartFormatter(res.resp);
  const chartName = `Fee volume (${coinCodes[chain]})`;

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
          yAxisLabelsFormatter={formatATOMAmount}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatATOM}
          tooltipLabelFormatter={formatDateWithTime}
          color={color}
        />
      }
    />
  );
};

export default FeeVol;
