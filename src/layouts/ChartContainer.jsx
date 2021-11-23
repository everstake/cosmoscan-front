import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../components/styled/Card';
import TitleChart from '../components/styled/TitleChart';

const ChartHeader = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.black};
  transition: color 0.2s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const ChartContainer = ({ title, chart, select, titleTooltip }) => (
  <Card>
    <ChartHeader>
      <TitleChart>
        <span>
          {title}
          {titleTooltip && (
            <OverlayTrigger
              // placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip">{titleTooltip}</Tooltip>}
            >
              <Icon icon="question-circle" style={{ marginLeft: '5px' }} />
            </OverlayTrigger>
          )}
        </span>
      </TitleChart>
      {select}
    </ChartHeader>

    <Card.Body>{chart}</Card.Body>
  </Card>
);

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  chart: PropTypes.node.isRequired,
  select: PropTypes.node,
  titleTooltip: PropTypes.string,
};
ChartContainer.defaultProps = {
  select: <></>,
  titleTooltip: '',
};

export default ChartContainer;
