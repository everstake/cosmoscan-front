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
} from 'recharts';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import Spinner from '../Spinner';

const BarChartStyled = styled(BarChartDefault)`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  
  //.recharts-tooltip-wrapper {
  //  max-width: 250px;
  //  word-break: break-all;
  //  word-wrap: break-word;
  //}
  
  //.recharts-default-tooltip {
  //  max-width: 200px;
  //  word-wrap: break-word;
  //  white-space: initial !important;
  //}
`;

const BarChart = ({
  isLoading,
  data,
  yAxisWidth,
  yAxisTickCount,
  yAxisLabelsFormatter,
  xAxisTickFormatter,
  tooltipFormatter,
  tooltipLabelFormatter,
  barName,
  barColor,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{ width: '100%', height: '400px' }}
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading
        ? (
          <div
            className="d-flex justify-content-center align-items-center h-100"
          >
            <Spinner />
          </div>
        )
        : data && data.length
          ? (
            <ResponsiveContainer>
              <BarChartStyled
                data={data}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e2e9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tick={{ fill: theme.gray }}
                  axisLine={false}
                  tickFormatter={xAxisTickFormatter}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.gray }}
                  width={yAxisWidth}
                  tickCount={yAxisTickCount}
                  tickFormatter={yAxisLabelsFormatter}
                  type="number"
                />
                <Tooltip
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
                <Bar
                  dataKey="dataPiece"
                  fill={barColor}
                  name={barName}
                  minPointSize={1}
                />
              </BarChartStyled>
            </ResponsiveContainer>
          )
          : (
            <div
              className="d-flex justify-content-center align-items-center h-100"
            >
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
  xAxisTickFormatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  tooltipLabelFormatter: PropTypes.func,
  barName: PropTypes.string,
  barColor: PropTypes.string,
};
BarChart.defaultProps = {
  isLoading: false,
  yAxisWidth: 40,
  yAxisTickCount: 10,
  yAxisLabelsFormatter: () => null,
  xAxisTickFormatter: () => null,
  tooltipFormatter: () => null,
  tooltipLabelFormatter: () => null,
  barName: 'Bar name',
  barColor: '#476eeb',
};

export default BarChart;
