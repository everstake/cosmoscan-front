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
  formatNum,
} from '../../../utils';
import API from '../../../api';
import BarChart from '../../chart-types/BarChart';

const chartName = '# of transactions per day/hour';
const yAxisWidth = 50;
const yTickCount = 10;
const areaName = '# of transactions';
const defaultPeriod = periodOpts[2];

const Operations = () => {
  const theme = useContext(ThemeContext);
  const color = theme.violet;
  const res = useRequest(API.getOperations, defaultPeriod.value);
  const opsComp = useMemo(() => formatBarChartData(res.resp), [res]);

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
          data={opsComp}
          yAxisLabelsFormatter={formatNum}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatNum}
          tooltipLabelFormatter={formatDateWithTime}
          barColor={color}
        />
      }
    />
  );
};

export default Operations;
