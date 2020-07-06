import React from 'react';
import { useParams } from 'react-router-dom';
import ChartContainer from '../../../../layouts/ChartContainer';
import AreaChart from '../../../chart-types/AreaChart';
import {
  formatATOM, formatATOMAmount, formatDate, formatDateWithTime, roundToPrecision
} from '../../../../utils';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';
import useChartFormatter from '../../../../hooks/useChartFormatter';


const chartName = 'Delegated balance (ATOM)';
const yAxisWidth = 70;
const yTickCount = 10;
const yAxisLabelsFormatter = (val) => formatATOMAmount(roundToPrecision(val));
const areaName = 'Delegated balance';


const DelegatedBalance = () => {
  const { address } = useParams();
  const { resp, isLoading } = useRequest(API.getDelegatedBalance, address);
  const delBal = useChartFormatter(resp);

  return (
    <ChartContainer
      title={chartName}
      chart={(
        <AreaChart
          areaName={areaName}
          isLoading={isLoading}
          data={delBal}
          yAxisLabelsFormatter={yAxisLabelsFormatter}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatATOM}
          tooltipLabelFormatter={formatDateWithTime}
        />
      )}
    />
  );
};

export default DelegatedBalance;
