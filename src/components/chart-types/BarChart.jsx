import React, { useContext } from 'react';
import {
  ResponsiveContainer,
  BarChart as BarChartDefault,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
} from 'recharts';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import Spinner from '../reusable/Spinner';

const BarChartStyled = styled(BarChartDefault)`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;

  .recharts-tooltip-wrapper {
    z-index: 1;
  }
`;

const BarChart = ({
  isLoading,
  data,
  yAxisWidth,
  yAxisTickCount,
  yAxisLabelsFormatter,
  xAxisTickFormatter,
  xAxisTickCount,
  xAxisTickInterval,
  yAxisDomain,
  tooltipFormatter,
  tooltipLabelFormatter,
  barName,
  barColor,
  noLegend,
  customTooltip,
  isBrush,
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
          <BarChartStyled data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e2e9"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fill: theme.gray }}
              tickCount={xAxisTickCount}
              axisLine={false}
              tickFormatter={xAxisTickFormatter}
              interval={xAxisTickInterval}
              minTickGap={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.gray }}
              width={yAxisWidth}
              tickCount={yAxisTickCount}
              tickFormatter={yAxisLabelsFormatter}
              type="number"
              domain={yAxisDomain}
            />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={tooltipLabelFormatter}
              content={customTooltip || null}
            />
            {!noLegend && (
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
            )}
            {isBrush && (
              <Brush
                dataKey="name"
                height={15}
                stroke={barColor}
                gap={10}
                startIndex={data.length - 20}
                travellerWidth={8}
                className="mt-5"
              />
            )}
            <Bar
              dataKey="dataPiece"
              fill={barColor}
              name={barName}
              minPointSize={1}
            />
          </BarChartStyled>
        </ResponsiveContainer>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          No data
        </div>
      )}
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  yAxisWidth: PropTypes.number,
  yAxisTickCount: PropTypes.number,
  yAxisLabelsFormatter: PropTypes.func,
  yAxisDomain: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  ),
  xAxisTickFormatter: PropTypes.func,
  xAxisTickCount: PropTypes.number,
  xAxisTickInterval: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tooltipFormatter: PropTypes.func,
  tooltipLabelFormatter: PropTypes.func,
  barName: PropTypes.string,
  barColor: PropTypes.string,
  noLegend: PropTypes.bool,
  customTooltip: PropTypes.node,
  isBrush: PropTypes.bool,
};
BarChart.defaultProps = {
  isLoading: false,
  yAxisWidth: 40,
  yAxisTickCount: 10,
  yAxisLabelsFormatter: (val) => val,
  yAxisDomain: [0, 'auto'],
  xAxisTickFormatter: (val) => val,
  xAxisTickCount: 10,
  xAxisTickInterval: 'preserveEnd',
  tooltipFormatter: (val) => val,
  tooltipLabelFormatter: (val) => val,
  barName: 'Bar name',
  barColor: '#476eeb',
  noLegend: false,
  customTooltip: false,
  isBrush: false,
};

export default BarChart;
