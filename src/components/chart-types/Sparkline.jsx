import React from 'react';
import {
  ResponsiveContainer,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';
import useHover from '../../hooks/useHover';

const Sparkline = ({ data, color }) => {
  const [handleMouseOver, handleMouseOut, isHover] = useHover();

  return (
    <div
      style={{ width: '100%', minWidth: '120px', height: '90px' }}
      onMouseEnter={handleMouseOver}
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <YAxis
            hide
            dataKey="y"
            tickSize={3}
            domain={['dataMin', 'dataMax']}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e9" />
          <Bar
            type="monotone"
            dataKey="y"
            stroke={color}
            fill={color}
            fillOpacity={0.3}
            strokeWidth={1}
            connectNulls
            isAnimationActive={isHover}
            animationDuration={1000}
            onAnimationEnd={() => handleMouseOut()}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

Sparkline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  color: PropTypes.string,
};
Sparkline.defaultProps = {
  color: theme.blue,
};

export default Sparkline;
