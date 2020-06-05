import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import AreaChart from '../../chart-types/AreaChart';
import Card from '../../styled/Card';
import { lastThirtyDays } from '../../../utils';
import TitleChart from '../../styled/TitleChart';

const Vol = () => {
  // TODO: Store and compute data correctly
  const data = lastThirtyDays.map((e, i) => ({
    x: e,
    y: i * 1000,
  }));
  const theme = useContext(ThemeContext);
  const yAxisWidth = 95;
  const formatYAxisLabels = (value) => `${value} ATOM`;
  const yTickCount = 10;
  const areaUnit = ' ATOM';
  const areaName = 'Volume';
  const color = theme.success;

  return (
    <Card>
      <Card.Header>
        <TitleChart>Volume</TitleChart>
      </Card.Header>

      <Card.Body>
        <AreaChart
          data={data}
          yAxisLabelsFormatter={formatYAxisLabels}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          areaUnit={areaUnit}
          areaName={areaName}
          color={color}
        />
      </Card.Body>
    </Card>
  );
};

export default Vol;
