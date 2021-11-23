import React from 'react';
import { useParams } from 'react-router-dom';
import ChartContainer from '../../../../layouts/ChartContainer';
import AreaChart from '../../../chart-types/AreaChart';
import {
  formatToken,
  formatTokenAmount,
  formatDate,
  formatDateWithTime,
  roundToPrecision,
} from '../../../../utils';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';
import useChartFormatter from '../../../../hooks/useChartFormatter';
import useCoinFormatter from '../../../../hooks/useCoinFormatter';

const yAxisWidth = 70;
const yTickCount = 10;
const yAxisLabelsFormatter = (val) => formatTokenAmount(roundToPrecision(val));
const areaName = 'Delegated balance';

const DelegatedBalance = () => {
  const { address } = useParams();
  const { resp, isLoading } = useRequest(API.getDelegatedBalance, address);
  const delBal = useChartFormatter(resp);
  const coin = useCoinFormatter();

  const chartName = `Delegated balance (${coin})`;

  return (
    <ChartContainer
      title={chartName}
      chart={
        <AreaChart
          areaName={areaName}
          isLoading={isLoading}
          data={delBal}
          yAxisLabelsFormatter={yAxisLabelsFormatter}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatToken}
          tooltipLabelFormatter={formatDateWithTime}
        />
      }
    />
  );
};

export default DelegatedBalance;
