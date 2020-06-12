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

const PieChartStyled = styled(PieChartDefault)`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
`;

const PieChart = ({
  data,
  valFormatter,
  labelFormatter,
  height,
  isAnimationActive
}) => {
  const theme = useContext(ThemeContext);
  const COLORS = [
    theme.blue,
    '#223882',
    '#7489CC',
    '#3D59B8',
    '#475480',
    '#0939D6',
    '#9DB1F5',
    '#51639E',
    '#2C3F7D',
    '#7389D1',
    '#092B9C',
    '#0031D1',
    '#4A67C7',
    '#5F78C7',
    '#1645DE',
    '#4A69CF',
    '#2954E3',
    '#2757F5',
    '#95A1C7',
    '#303F70',
  ];

  return (
    <div style={{ width: '100%', height: `${height}px` }}>
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
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  valFormatter: PropTypes.func,
  labelFormatter: PropTypes.func,
  height: PropTypes.number,
  isAnimationActive: PropTypes.bool,
};
PieChart.defaultProps = {
  valFormatter: (val) => val,
  labelFormatter: (entry) => entry.value,
  height: 400,
  isAnimationActive: true,
};

export default PieChart;
