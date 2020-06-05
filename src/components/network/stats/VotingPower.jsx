import React from 'react';
import PieChart from '../../chart-types/PieChart';
import Card from '../../styled/Card';
import TitleChart from '../../styled/TitleChart';

const VotingPower = () => {
  const valFormatter = (val) => `${val}%`;
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

  return (
    <Card>
      <Card.Header>
        <TitleChart>
          Voting power
        </TitleChart>
      </Card.Header>

      <Card.Body>
        <PieChart
          data={votingDist}
          valFormatter={valFormatter}
          labelFormatter={labelFormatter}
        />
      </Card.Body>
    </Card>
  );
};

export default VotingPower;
