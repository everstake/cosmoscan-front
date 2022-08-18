import React, { useContext, useMemo } from 'react';
import numeral from 'numeral';
import { ThemeContext } from 'styled-components';
import { useParams } from 'react-router-dom';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';
import ChartContainer from '../../../../layouts/ChartContainer';
import {
  formatNum,
  formatDate,
  formatDateWithTime,
  formatBarChartData,
} from '../../../../utils';
import BarChart from '../../../chart-types/BarChart';

const chartName = '# of delegators';
const yAxisWidth = 40;
const yTickCount = 10;
const areaName = chartName;
const formatLabels = (num) => numeral(num).format('0,0');

const NumOfDelegators = () => {
  const { address } = useParams();
  const theme = useContext(ThemeContext);
  const color = theme.navyBlue;
  const { resp, isLoading } = useRequest(API.getNumOfDelegators, address);
  const numOfDelegators = useMemo(() => formatBarChartData(resp), [resp]);

  return (
    <ChartContainer
      title={chartName}
      chart={
        <BarChart
          barName={areaName}
          isLoading={isLoading}
          data={numOfDelegators}
          yAxisLabelsFormatter={formatLabels}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatNum}
          tooltipLabelFormatter={formatDateWithTime}
          barColor={color}
        />
      }
    />
  );
};

export default NumOfDelegators;
