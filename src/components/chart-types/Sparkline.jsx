import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';

const Sparkline = ({ data, color }) => (
  <div style={{ width: '100%', minWidth: '120px', height: '40px' }}>
    <ResponsiveContainer>
      <AreaChart
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
    </ResponsiveContainer>
  </div>
);

Sparkline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  color: PropTypes.string,
};
Sparkline.defaultProps = {
  color: theme.blue,
};

export default Sparkline;
