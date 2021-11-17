import React from 'react';
import {
  ResponsiveContainer,
  PieChart as PieChartDefault,
  Tooltip,
  Legend,
  Pie,
  Cell,
} from 'recharts';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Spinner from '../reusable/Spinner';
import { bluePalette } from '../../utils/constants';

const PieChartStyled = styled(PieChartDefault)`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: ${({ defaultHeight }) => `${defaultHeight}px`};

  @media (max-width: ${({ theme: { smDown } }) => smDown}) {
    height: ${({ growOnMobile }) => (growOnMobile ? '600px' : '')};
  }
`;

const PieChart = ({
  isLoading,
  data,
  valFormatter,
  labelFormatter,
  height,
  isAnimationActive,
  minAngle,
  displayLegend,
  cellColors,
  growOnMobile,
  displayTooltip,
}) => (
  <ChartWrapper defaultHeight={height} growOnMobile={growOnMobile}>
    {/* eslint-disable-next-line no-nested-ternary */}
    {isLoading ? (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner />
      </div>
    ) : data && data.length ? (
      <ResponsiveContainer>
        <PieChartStyled>
          {displayTooltip && <Tooltip formatter={valFormatter} />}
          {displayLegend && (
            <Legend
              align="left"
              iconType="circle"
              verticalAlign="top"
              wrapperStyle={{
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            />
          )}
          <Pie
            data={data}
            dataKey="value"
            nameKey="title"
            minAngle={minAngle}
            label={labelFormatter}
            unit=" %"
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.title}
                fill={cellColors[index % cellColors.length]}
              />
            ))}
          </Pie>
        </PieChartStyled>
      </ResponsiveContainer>
    ) : (
      <div className="d-flex justify-content-center align-items-center h-100">
        No data
      </div>
    )}
  </ChartWrapper>
);

PieChart.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  valFormatter: PropTypes.func,
  labelFormatter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  height: PropTypes.number,
  isAnimationActive: PropTypes.bool,
  minAngle: PropTypes.number,
  displayLegend: PropTypes.bool,
  growOnMobile: PropTypes.bool,
  cellColors: PropTypes.arrayOf(PropTypes.string),
  displayTooltip: PropTypes.bool,
};
PieChart.defaultProps = {
  data: [],
  isLoading: false,
  valFormatter: (val) => val,
  labelFormatter: (entry) => entry.value,
  height: 400,
  isAnimationActive: true,
  minAngle: 1.5,
  displayLegend: true,
  growOnMobile: true,
  cellColors: bluePalette,
  displayTooltip: true,
};

export default PieChart;
