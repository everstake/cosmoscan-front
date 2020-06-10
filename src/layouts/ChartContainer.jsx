import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../components/styled/Card';
import TitleChart from '../components/styled/TitleChart';

const ChartHeader = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  padding: 15px
`;

const ChartContainer = ({
  title, chart, select,
}) => (
  <Card>
    <ChartHeader>
      <TitleChart>
        {title}
      </TitleChart>
      {select}
    </ChartHeader>

    <Card.Body>
      {chart}
    </Card.Body>
  </Card>
);

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  chart: PropTypes.node.isRequired,
  select: PropTypes.node,
};
ChartContainer.defaultProps = {
  select: <></>,
};

export default ChartContainer;
