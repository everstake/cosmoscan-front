import React from 'react';
// import { useHistory } from 'react-router-dom';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import AreaChart from '../../chart-types/AreaChart';
import { periodOpts } from '../../../utils/constants';
import {
  formatATOM, formatATOMAmount, formatDate, formatDateWithTime,
} from '../../../utils';
import API from '../../../api';


const chartName = 'Transfer volume (ATOM)';
const yAxisWidth = 60;
const yTickCount = 10;
const areaName = 'Transfer volume';
const defaultPeriod = periodOpts[2];
const isDotClickable = false;

const TxVol = () => {
  const res = useRequest(API.getTxVol, defaultPeriod.value);
  const txVolComp = useChartFormatter(res.resp);
  // TODO: Configure right navigation
  // const history = useHistory();
  // const onDotClick = () => history.push('/network');

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
          data={txVolComp}
          yAxisLabelsFormatter={formatATOMAmount}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisDomain={[(dataMin) => Math.round(dataMin), (dataMax) => Math.round(dataMax)]}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatATOM}
          tooltipLabelFormatter={formatDateWithTime}
          isDotClickable={isDotClickable}
        />
        )}
    />
  );
};

export default TxVol;
