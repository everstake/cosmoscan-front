import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../components/styled/Card';
import TitleChart from '../components/styled/TitleChart';
import Select from '../components/Select';

const ChartHeader = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  padding: 15px
`;

const ChartContainer = ({
  title, chart, selectOpts, onSelectChange, isPeriodSelectable,
}) => (
  <Card>
    <ChartHeader>
      <TitleChart>
        {title}
      </TitleChart>
      {isPeriodSelectable
      && (
      <Select
        opts={selectOpts}
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
  selectOpts: PropTypes.arrayOf(PropTypes.object),
  onSelectChange: PropTypes.func,
  isPeriodSelectable: PropTypes.bool,
};
ChartContainer.defaultProps = {
  onSelectChange: null,
  selectOpts: [],
  isPeriodSelectable: true,
};

export default ChartContainer;
