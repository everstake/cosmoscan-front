import React, { useContext } from 'react';
import {
  ResponsiveContainer,
  PieChart as PieChartDefault,
  Tooltip,
  Legend,
  Pie,
  Cell,
} from 'recharts';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import Spinner from '../Spinner';

const PieChartStyled = styled(PieChartDefault)`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
`;

const PieChart = ({
  isLoading,
  data,
  valFormatter,
  labelFormatter,
  height,
  isAnimationActive,
}) => {
  const theme = useContext(ThemeContext);
  const COLORS = [
    '#0C39D0',
    '#234FE3',
    theme.blue,
    '#6B8AF0',
    '#97ADF5',
    '#440BD2',
    '#5921E4',
    '#7646EC',
    '#916AF0',
    '#B296F6',
    '#067ACB',
    '#178DE0',
    '#3DA1E9',
    '#63B5EE',
    '#91CBF4',
    '#0C227C',
    '#112DA0',
    '#2946BA',
    '#4861C4',
    '#6D81D4',
  ];

  return (
    <div style={{ width: '100%', height: `${height}px` }}>
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
              <PieChartStyled>
                <Tooltip formatter={valFormatter} />
                <Legend
                  align="left"
                  iconType="circle"
                  verticalAlign="top"
                  wrapperStyle={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="title"
                  minAngle={1.5}
                  label={labelFormatter}
                  unit=" %"
                  isAnimationActive={isAnimationActive}
                >
                  {
                   data.map((entry, index) => (
                     <Cell key={entry.title} fill={COLORS[index % COLORS.length]} />
                   ))
                 }
                </Pie>
              </PieChartStyled>
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

PieChart.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  valFormatter: PropTypes.func,
  labelFormatter: PropTypes.func,
  height: PropTypes.number,
  isAnimationActive: PropTypes.bool,
};
PieChart.defaultProps = {
  isLoading: false,
  valFormatter: (val) => val,
  labelFormatter: (entry) => entry.value,
  height: 400,
  isAnimationActive: true,
};

export default PieChart;
