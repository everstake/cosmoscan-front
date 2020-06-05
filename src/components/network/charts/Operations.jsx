import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import AreaChart from '../../chart-types/AreaChart';
import Card from '../../styled/Card';
import { lastThirtyDays } from '../../../utils';
import TitleChart from '../../styled/TitleChart';

const Operations = () => {
  // TODO: Store and compute data correctly
  const data = lastThirtyDays.map((e, i) => ({
    x: e,
    y: i * 1000,
  }));
  const theme = useContext(ThemeContext);
  const yAxisWidth = 76;
  const yTickCount = 10;
  const areaName = 'Operations';
  const color = theme.burgundy;

  return (
    <Card>
      <Card.Header>
        <TitleChart>Operations</TitleChart>
      </Card.Header>

      <Card.Body>
        <AreaChart
          data={data}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          areaName={areaName}
          color={color}
        />
      </Card.Body>
    </Card>
  );
};

export default Operations;
