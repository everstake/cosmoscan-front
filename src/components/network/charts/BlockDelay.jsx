import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import AreaChart from '../../chart-types/AreaChart';
import Card from '../../styled/Card';
import { lastThirtyDays, formatSeconds } from '../../../utils';
import TitleChart from '../../styled/TitleChart';

const BlockDelay = () => {
  // TODO: Store and compute data correctly
  const data = lastThirtyDays.map((e, i) => ({
    x: e,
    y: i * 60,
  }));
  const theme = useContext(ThemeContext);
  const formatYAxisLabels = (value) => formatSeconds(value);
  const yAxisWidth = 110;
  const yTickCount = 10;
  const areaName = 'Block delay';
  const color = theme.violet;

  return (
    <Card>
      <Card.Header>
        <TitleChart>Block delay</TitleChart>
      </Card.Header>

      <Card.Body>
        <AreaChart
          data={data}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisLabelsFormatter={formatYAxisLabels}
          tooltipFormatter={formatYAxisLabels}
          areaName={areaName}
          color={color}
        />
      </Card.Body>
    </Card>
  );
};

export default BlockDelay;
