import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import AreaChart from '../../chart-types/AreaChart';
import { periodOpts } from '../../../utils/constants';
import { formatDate, formatDateWithTime, formatSeconds } from '../../../utils';
import API from '../../../api';


const chartName = 'Block delay';
const yAxisWidth = 80;
const yTickCount = 10;
const areaName = chartName;
const defaultPeriod = periodOpts[2];

const BlockDelay = () => {
  const theme = useContext(ThemeContext);
  const color = theme.navyBlue;
  const res = useRequest(API.getBlockDelay, defaultPeriod.value);
  const blockDelayComp = useChartFormatter(res.resp);

  return (
    <ChartContainer
      title={chartName}
      select={(
        <SelectPeriod
          defaultPeriod={defaultPeriod}
          isDisabled={res.isLoading}
          onChange={res.request}
        />
      )}
      chart={(
        <AreaChart
          areaName={areaName}
          isLoading={res.isLoading}
          data={blockDelayComp}
          yAxisLabelsFormatter={formatSeconds}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatSeconds}
          tooltipLabelFormatter={formatDateWithTime}
          color={color}
        />
      )}
    />
  );
};

export default BlockDelay;
