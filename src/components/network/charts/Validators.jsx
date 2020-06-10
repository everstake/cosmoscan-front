import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import AreaChart from '../../chart-types/AreaChart';
import Card from '../../styled/Card';
import { lastThirtyDays } from '../../../utils';
import TitleChart from '../../styled/TitleChart';


const data = lastThirtyDays.map((e, i) => ({
  x: e,
  y: i * 1000,
}));
const yAxisWidth = 76;
const yTickCount = 10;
const areaName = 'Validators';

const Validators = () => {
  const theme = useContext(ThemeContext);
  const color = theme.navyBlue;

  return (
    <Card>
      <Card.Header>
        <TitleChart>Validators</TitleChart>
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

export default Validators;
