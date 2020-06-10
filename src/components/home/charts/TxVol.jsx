import React from 'react';
// import { useHistory } from 'react-router-dom';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import AreaChart from '../../chart-types/AreaChart';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import { periodOpts } from '../../../utils/constants';
import {
  formatATOM, formatDate, formatDateWithTime,
} from '../../../utils';
import API from '../../../api';


const chartName = 'Transaction volume';
const yAxisWidth = 75;
const yTickCount = 10;
const areaName = 'Tx volume';
const isDotClickable = false;
const defaultPeriod = periodOpts[2];

const TxVol = () => {
  // TODO: Configure right navigation
  // const history = useHistory();
  // const onDotClick = () => history.push('/network');
  const res = useRequest(API.getTxVol, defaultPeriod);
  const txVolComp = useChartFormatter(res.resp);
  const isDataNotEmpty = Boolean(res.resp && res.resp.length);

  return (
    <div>
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
            data={txVolComp}
            yAxisLabelsFormatter={formatATOM}
            yAxisWidth={yAxisWidth}
            yTickCount={yTickCount}
            xAxisTickFormatter={formatDate}
            areaName={areaName}
            isDotClickable={isDotClickable}
            tooltipFormatter={formatATOM}
            tooltipLabelFormatter={formatDateWithTime}
          />
        )}
      />
    </div>
  );
};

export default TxVol;
