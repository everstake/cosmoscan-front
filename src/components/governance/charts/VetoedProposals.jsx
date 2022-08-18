import React, { useContext } from 'react';
import PT from 'prop-types';
import { ThemeContext } from 'styled-components';
import ChartContainer from '../../../layouts/ChartContainer';
import BarChart from '../../chart-types/BarChart';
import { formatId, formatPercentValue } from '../../../utils';

const chartName = 'Most vetoed proposals';
const yAxisWidth = 40;
const yAxisTickCount = 10;
const barName = chartName;
const tooltipTxt =
  "The proposals that received the highest amount of 'No with veto' votes";
const tooltipLabelFormatter = (val) => `Proposal ${formatId(val)}`;

const VetoedProposals = ({ isLoading, data }) => {
  const theme = useContext(ThemeContext);

  return (
    <ChartContainer
      title={chartName}
      titleTooltip={tooltipTxt}
      chart={
        <BarChart
          isLoading={isLoading}
          data={data}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yAxisTickCount}
          yAxisLabelsFormatter={formatPercentValue}
          xAxisTickFormatter={formatId}
          tooltipLabelFormatter={tooltipLabelFormatter}
          tooltipFormatter={formatPercentValue}
          barColor={theme.burgundy}
          barName={barName}
        />
      }
    />
  );
};

VetoedProposals.propTypes = {
  isLoading: PT.bool,
  data: PT.arrayOf(PT.object),
};
VetoedProposals.defaultProps = {
  isLoading: false,
  data: [],
};

export default VetoedProposals;
