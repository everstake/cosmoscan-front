import React, {
  useContext,
} from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import AreaChart from '../../chart-types/AreaChart';
import SelectPeriod from '../../SelectPeriod';
import { periodOpts } from '../../../utils/constants';
import {
  formatATOM, formatDate, formatDateWithTime,
} from '../../../utils';
import ChartContainer from '../../../layouts/ChartContainer';
import API from '../../../api';


const chartName = 'Fee volume';
const yAxisWidth = 76;
const yTickCount = 10;
const areaName = chartName;
const defaultPeriod = periodOpts[2];

const FeeVol = () => {
  const theme = useContext(ThemeContext);
  const color = theme.navyBlue;
  const res = useRequest(API.getFeeVol, defaultPeriod);
  const feeVolComp = useChartFormatter(res.resp);
  const isDataNotEmpty = Boolean(res.resp && res.resp.length);

  return (
    <ChartContainer
      title={chartName}
      select={isDataNotEmpty && (
        <SelectPeriod
          // defaultPeriod={defaultPeriod}
          onChange={res.request}
        />
      )}
      chart={(
        <AreaChart
          isLoading={res.isLoading}
          data={feeVolComp}
          yAxisLabelsFormatter={formatATOM}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          xAxisTickFormatter={formatDate}
          areaName={areaName}
          color={color}
          tooltipFormatter={formatATOM}
          tooltipLabelFormatter={formatDateWithTime}
        />
      )}
    />
  );
};

export default FeeVol;
