import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import AreaChart from '../../chart-types/AreaChart';
import Card from '../../styled/Card';
import { lastThirtyDays } from '../../../utils';
import TitleChart from '../../styled/TitleChart';

const Blocks = () => {
  // TODO: Store and compute data correctly
  const data = lastThirtyDays.map((e, i) => ({
    x: e,
    y: i * 100000,
  }));
  const theme = useContext(ThemeContext);
  const yAxisWidth = 76;
  const yTickCount = 10;
  const areaName = 'Blocks';
  const color = theme.black;

  return (
    <Card>
      <Card.Header>
        <TitleChart>Blocks</TitleChart>
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

export default Blocks;
