import React from 'react';
import {
  AreaChart,
  Area,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';

const Sparkline = ({ data, color }) => (
  <AreaChart
    height={40}
    width={120}
    data={data}
    margin={{
      top: 0, left: 0, right: 0, bottom: 0,
    }}
  >
    <YAxis
      hide
      dataKey="y"
      domain={['dataMin', 'dataMax']}
    />
    <Area
      type="monotone"
      dataKey="y"
      stroke={color}
      fill={color}
      fillOpacity={0.3}
      strokeWidth={1}
      connectNulls
    />
  </AreaChart>
);

Sparkline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  color: PropTypes.string,
};
Sparkline.defaultProps = {
  color: theme.blue,
};

export default Sparkline;
