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

const chartName = '# of validators per day/hour';
const yAxisWidth = 30;
const yTickCount = 10;
const areaName = '# of validators';
const defaultPeriod = periodOpts[2];

const Validators = () => {
  const theme = useContext(ThemeContext);
  const color = theme.burgundy;
  const res = useRequest(API.getValidators, defaultPeriod.value);
  const validatorsComp = useMemo(() => formatBarChartData(res.resp), [res]);

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
          data={validatorsComp}
          yAxisLabelsFormatter={formatNum}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          yAllowDecimals={false}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatNum}
          tooltipLabelFormatter={formatDateWithTime}
          barColor={color}
        />
      }
    />
  );
};

export default Validators;
