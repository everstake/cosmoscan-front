import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import ChartContainer from '../../../layouts/ChartContainer';
import PieChart from '../../chart-types/PieChart';
import { formatPercentDec2 } from '../../../utils';


const chartName = 'Voting';
const labelFormatter = (entry) => `${formatPercentDec2(entry.value)}`;

function VotingChart({ data }) {
  const theme = useContext(ThemeContext);

  return (
    <ChartContainer
      title={chartName}
      chart={(
        <PieChart
          data={data}
          valFormatter={formatPercentDec2}
          labelFormatter={labelFormatter}
          height={250}
          minAngle={7}
          growOnMobile={false}
          cellColors={[theme.blue, theme.danger, theme.burgundy, theme.grey]}
          isAnimationActive={false}
        />
      )}
    />
  );
}

VotingChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
VotingChart.defaultProps = {
  data: [],
};

export default VotingChart;
