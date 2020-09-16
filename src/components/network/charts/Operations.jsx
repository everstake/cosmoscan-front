import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import AreaChart from '../../chart-types/AreaChart';
import { periodOpts } from '../../../utils/constants';
import { formatDate, formatDateWithTime, formatNum } from '../../../utils';
import API from '../../../api';

const chartName = '# of transactions per day/hour';
const yAxisWidth = 50;
const yTickCount = 10;
const areaName = '# of transactions';
const defaultPeriod = periodOpts[2];

const Operations = () => {
  const theme = useContext(ThemeContext);
  const color = theme.violet;
  const res = useRequest(API.getOperations, defaultPeriod.value);
  const opsComp = useChartFormatter(res.resp);

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
          data={opsComp}
          yAxisLabelsFormatter={formatNum}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatNum}
          tooltipLabelFormatter={formatDateWithTime}
          color={color}
        />
      }
    />
  );
};

export default Operations;
