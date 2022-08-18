import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import {
  formatPercentValue,
  formatDate,
  formatDateWithTime,
  formatBarChartData,
} from '../../../utils';
import useRequest from '../../../hooks/useRequest';
import API from '../../../api';
import { periodOpts } from '../../../utils/constants';
import BarChart from '../../chart-types/BarChart';

const chartName = 'Bonded ratio';
const yAxisWidth = 60;
const yTickCount = 10;
const defaultPeriod = periodOpts[2];

const BondedRatio = () => {
  const theme = useContext(ThemeContext);
  const color = theme.navyBlue;
  const res = useRequest(API.getBondedRatio, defaultPeriod.value);
  const bondedRatio = useMemo(() => formatBarChartData(res.resp), [res]);

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
          isLoading={res.isLoading}
          data={bondedRatio}
          yAxisLabelsFormatter={formatPercentValue}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatPercentValue}
          tooltipLabelFormatter={formatDateWithTime}
          barName={chartName}
          barColor={color}
        />
      }
    />
  );
};

export default BondedRatio;
