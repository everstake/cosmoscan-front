import React, { useMemo, useContext } from 'react';
import {ThemeContext} from 'styled-components';
import ChartContainer from '../../../layouts/ChartContainer';
import BarChart from '../../chart-types/BarChart';
import { formatNum } from '../../../utils';
import useRequest from '../../../hooks/useRequest';
import API from '../../../api';


const chartName = 'Most jailed validators';
const barName = 'Jail count';
const yAxisWidth = 40;
const yAxisTickCount = 5;
const xAxisTickFormatter = (val) => val;
const tooltipLabelFormatter = xAxisTickFormatter;


const Jailed = () => {
  const theme = useContext(ThemeContext);
  const { resp, isLoading } = useRequest(API.getJailed);
  const jailed = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.sort((a, b) => a.value - b.value).map((el) => ({
      name: el.validator,
      dataPiece: el.value,
    }));
  }, [resp]);

  return (
    <ChartContainer
      title={chartName}
      chart={(
        <BarChart
          isLoading={isLoading}
          data={jailed}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yAxisTickCount}
          yAxisLabelsFormatter={formatNum}
          xAxisTickFormatter={xAxisTickFormatter}
          tooltipLabelFormatter={tooltipLabelFormatter}
          tooltipFormatter={formatNum}
          barName={barName}
          barColor={theme.navyBlue}
        />
      )}
    />
  );
};

export default Jailed;
