import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ChartContainer from '../../../../layouts/ChartContainer';
import {
  formatToken,
  formatTokenAmount,
  formatDate,
  formatDateWithTime,
  roundToPrecision,
  formatBarChartData,
} from '../../../../utils';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';
import useCoinFormatter from '../../../../hooks/useCoinFormatter';
import BarChart from '../../../chart-types/BarChart';

const yAxisWidth = 70;
const yTickCount = 10;
const yAxisLabelsFormatter = (val) => formatTokenAmount(roundToPrecision(val));
const areaName = 'Delegated balance';

const DelegatedBalance = () => {
  const { address } = useParams();
  const { resp, isLoading } = useRequest(API.getDelegatedBalance, address);
  const coin = useCoinFormatter();
  const chartName = `Delegated balance (${coin})`;
  const delBal = useMemo(() => formatBarChartData(resp), [resp]);

  return (
    <ChartContainer
      title={chartName}
      chart={
        <BarChart
          barName={areaName}
          isLoading={isLoading}
          data={delBal}
          yAxisLabelsFormatter={yAxisLabelsFormatter}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
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
