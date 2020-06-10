import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../components/styled/Card';
import TitleChart from '../components/styled/TitleChart';
import SelectPeriod from '../components/SelectPeriod';

const ChartHeader = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  padding: 15px
`;

const ChartContainer = ({
  title, chart, onSelectChange, isPeriodSelectable, defaultSelectOpt,
}) => (
  <Card>
    <ChartHeader>
      <TitleChart>
        {title}
      </TitleChart>
      {isPeriodSelectable
      && (
      <SelectPeriod
        onChange={onSelectChange}
      />
      )}
    </ChartHeader>

    <Card.Body>
      {chart}
    </Card.Body>
  </Card>
);

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  chart: PropTypes.node.isRequired,
  onSelectChange: PropTypes.func,
  isPeriodSelectable: PropTypes.bool,
};
ChartContainer.defaultProps = {
  onSelectChange: null,
  isPeriodSelectable: true,
};

export default ChartContainer;
