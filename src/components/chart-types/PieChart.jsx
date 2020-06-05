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
}) => {
  const theme = useContext(ThemeContext);
  const COLORS = [
    theme.black,
    theme.violet,
    theme.navyBlue,
    theme.burgundy,
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
};
PieChart.defaultProps = {
  valFormatter: (val) => val,
  labelFormatter: (entry) => entry.value,
  height: 400,
};

export default PieChart;
