import React from 'react';
import {
  AreaChart,
  Area,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';

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
  color: '#5c3bed',
};

export default Sparkline;
