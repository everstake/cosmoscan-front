import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import ChartContainer from '../../../layouts/ChartContainer';
import BarChart from '../../chart-types/BarChart';
import { formatNum } from '../../../utils';
import useRequest from '../../../hooks/useRequest';
import API from '../../../api';


const chartName = 'Total delegators';
const barName = chartName;
const yAxisWidth = 50;
const yAxisTickCount = 10;
const xAxisTickFormatter = (val) => val;
const tooltipLabelFormatter = xAxisTickFormatter;


const Delegators = () => {
  const theme = useContext(ThemeContext);
  const { resp, isLoading } = useRequest(API.getDelegators);
  const delegators = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.map((el) => ({
      name: el.validator,
      dataPiece: el.value,
    })).sort((a, b) => a.dataPiece - b.dataPiece);
  }, [resp]);

  return (
    <ChartContainer
      title={chartName}
      chart={(
        <BarChart
          isLoading={isLoading}
          data={delegators}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yAxisTickCount}
          yAxisLabelsFormatter={formatNum}
          xAxisTickFormatter={xAxisTickFormatter}
          yAxisDomain={['dataMin', 'dataMax']}
          tooltipLabelFormatter={tooltipLabelFormatter}
          tooltipFormatter={formatNum}
          barName={barName}
          isBrush
          barColor={theme.violet}
        />
      )}
    />
  );
};

export default Delegators;
