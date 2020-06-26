import React from 'react';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import AreaChart from '../../chart-types/AreaChart';
import { periodOpts } from '../../../utils/constants';
import { formatNum, formatDate, formatDateWithTime } from '../../../utils';
import API from '../../../api';


const chartName = '# of blocks per day/hour';
const yAxisWidth = 50;
const yTickCount = 10;
const areaName = '# of blocks';
const defaultPeriod = periodOpts[2];

const Blocks = () => {
  const res = useRequest(API.getBlocks, defaultPeriod.value);
  const blocksComp = useChartFormatter(res.resp);

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
          data={blocksComp}
          yAxisLabelsFormatter={formatNum}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatNum}
          tooltipLabelFormatter={formatDateWithTime}
        />
      )}
    />
  );
};

export default Blocks;
