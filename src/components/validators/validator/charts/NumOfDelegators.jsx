import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useParams } from 'react-router-dom';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';
import useChartFormatter from '../../../../hooks/useChartFormatter';
import ChartContainer from '../../../../layouts/ChartContainer';
import AreaChart from '../../../chart-types/AreaChart';
import { formatNum, formatDate, formatDateWithTime } from '../../../../utils';

const chartName = '# of delegators';
const yAxisWidth = 40;
const yTickCount = 10;
const areaName = chartName;

const NumOfDelegators = () => {
  const { address } = useParams();
  const theme = useContext(ThemeContext);
  const color = theme.navyBlue;
  const { resp, isLoading } = useRequest(API.getNumOfDelegators, address);
  const numOfDelegators = useChartFormatter(resp);

  return (
    <ChartContainer
      title={chartName}
      chart={
        <AreaChart
          areaName={areaName}
          isLoading={isLoading}
          data={numOfDelegators}
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

export default NumOfDelegators;
