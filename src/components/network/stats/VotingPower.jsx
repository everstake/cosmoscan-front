import React from 'react';
import PieChart from '../../chart-types/PieChart';
import Card from '../../styled/Card';
import TitleChart from '../../styled/TitleChart';
import { formatPercentValue } from '../../../utils';


const labelFormatter = (entry) => `${entry.value}%`;
const votingDist = [
  {
    title: 'Test', value: 22,
  },
  {
    title: 'Test2', value: 87.9,
  },
  {
    title: 'Test3', value: 0.1,
  },
];

const VotingPower = () => (
  <Card>
    <Card.Header>
      <TitleChart>
        Voting power
      </TitleChart>
    </Card.Header>

    <Card.Body>
      <PieChart
        data={votingDist}
        valFormatter={formatPercentValue}
        labelFormatter={labelFormatter}
      />
    </Card.Body>
  </Card>
);

export default VotingPower;
