import React, { useContext, useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import { periodOpts } from '../../../utils/constants';
import {
  formatToken,
  formatTokenAmount,
  formatDate,
  formatDateWithTime,
  formatBarChartData,
} from '../../../utils';
import API from '../../../api';
import useCoinFormatter from '../../../hooks/useCoinFormatter';
import BarChart from '../../chart-types/BarChart';

const yAxisWidth = 60;
const yTickCount = 10;
const areaName = 'Transfer volume';
const defaultPeriod = periodOpts[2];

const TxVol = () => {
  const theme = useContext(ThemeContext);
  const res = useRequest(API.getTxVol, defaultPeriod.value);
  const coin = useCoinFormatter();
  const chartName = `Transfer volume (${coin})`;
  // TODO: Configure right navigation
  // const history = useHistory();
  // const onDotClick = () => history.push('/network');
  const txVolComp = useMemo(() => formatBarChartData(res.resp), [res]);

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
        <BarChart
          isLoading={res.isLoading}
          data={txVolComp}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yTickCount}
          yAxisLabelsFormatter={formatTokenAmount}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatToken}
          tooltipLabelFormatter={formatDateWithTime}
          barColor={theme.blue}
          barName={areaName}
          yAxisDomain={[
            (dataMin) => Math.round(dataMin),
            (dataMax) => Math.round(dataMax),
          ]}
        />
      }
    />
  );
};

export default TxVol;
