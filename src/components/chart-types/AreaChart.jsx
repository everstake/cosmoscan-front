import React, { useContext } from 'react';

import {
  ResponsiveContainer,
  AreaChart as AreaChartDefault,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import Spinner from '../reusable/Spinner';

const AreaChartStyled = styled(AreaChartDefault)`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;

  .recharts-default-tooltip {
    max-width: 300px;
    word-wrap: break-word;
    white-space: initial !important;
  }
`;

const AreaChart = ({
  isLoading,
  data,
  yAxisLabelsFormatter,
  yAxisWidth,
  yTickCount,
  xAxisTickFormatter,
  yAxisDomain,
  yAllowDecimals,
  tooltipFormatter,
  tooltipLabelFormatter,
  areaName,
  areaUnit,
  color,
  onDotClick,
  isDotClickable,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner />
        </div>
      ) : data && data.length ? (
        <ResponsiveContainer>
          <AreaChartStyled data={data}>
            <XAxis
              dataKey="x"
              tickLine={false}
              tick={{ fill: theme.gray }}
              axisLine={false}
              tickFormatter={xAxisTickFormatter}
            />
            <YAxis
              tickLine={false}
              tick={{ fill: theme.gray }}
              tickFormatter={yAxisLabelsFormatter}
              width={yAxisWidth}
              tickCount={yTickCount}
              axisLine={false}
              type="number"
              domain={yAxisDomain}
              allowDecimals={yAllowDecimals}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e2e9"
              vertical={false}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3', stroke: color }}
              formatter={tooltipFormatter}
              labelFormatter={tooltipLabelFormatter}
            />
            <Legend
              align="left"
              iconType="circle"
              verticalAlign="top"
              height={50}
              wrapperStyle={{
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            />
            <Area
              type="monotone"
              dataKey="y"
              stroke={color}
              fill={color}
              fillOpacity={0.3}
              activeDot={{
                r: 6,
                onClick: onDotClick,
                cursor: isDotClickable ? 'pointer' : 'initial',
              }}
              strokeWidth={2}
              connectNulls
              unit={areaUnit}
              name={areaName}
            />
          </AreaChartStyled>
        </ResponsiveContainer>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          No data
        </div>
      )}
    </div>
  );
};

AreaChart.propTypes = {
  isLoading: PropTypes.bool,
  yAxisLabelsFormatter: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  yAxisWidth: PropTypes.number.isRequired,
  yTickCount: PropTypes.number.isRequired,
  xAxisTickFormatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  tooltipLabelFormatter: PropTypes.func,
  areaName: PropTypes.string.isRequired,
  areaUnit: PropTypes.string,
  color: PropTypes.string,
  isDotClickable: PropTypes.bool,
  onDotClick: PropTypes.func,
  yAxisDomain: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  ),
  yAllowDecimals: PropTypes.bool,
};
AreaChart.defaultProps = {
  isLoading: false,
  yAxisLabelsFormatter: (value) => value,
  xAxisTickFormatter: (value) => value,
  tooltipFormatter: (value) => value,
  tooltipLabelFormatter: (value) => value,
  areaUnit: '',
  color: '#476eeb',
  isDotClickable: false,
  onDotClick: () => null,
  yAxisDomain: [0, 'auto'],
  yAllowDecimals: true,
};

export default AreaChart;
