import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../components/styled/Card';
import TitleMinor from '../components/styled/TitleMinor';
import Sparkline from '../components/chart-types/Sparkline';
import Percent from '../components/Percent';

const CardBodyWidget = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetItem = styled.div`
  display: flex;
  justify-content: space-between;
  word-break: break-all;
  
  &:not(:first-child) {
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const WidgetStats = ({
  title, mainInfo, sparklineData, extraInfo,
}) => (
  <Card modifiers="height100">
    <CardBodyWidget>
      <WidgetItem>
        <TitleMinor>
          { title }
        </TitleMinor>
        <div>
          { sparklineData && sparklineData.length > 1
          && (
            <div>
              <Sparkline
                data={sparklineData}
                color={
                  sparklineData[sparklineData.length - 1].y
                  > sparklineData[sparklineData.length - 2].y
                    ? '#4ed22c'
                    : '#e04949'
                }
              />
            </div>
          )}
        </div>
      </WidgetItem>
      <WidgetItem>
        <div>
          { mainInfo }
        </div>
        <div>
          {sparklineData && sparklineData.length
          && (
          <Percent
            prevVal={sparklineData[0].y}
            currVal={sparklineData[sparklineData.length - 1].y}
          />
          )}
          { extraInfo }
        </div>
      </WidgetItem>
    </CardBodyWidget>
  </Card>
);

WidgetStats.propTypes = {
  title: PropTypes.string.isRequired,
  mainInfo: PropTypes.node.isRequired,
  sparklineData: PropTypes.arrayOf(PropTypes.object),
  extraInfo: PropTypes.node,
};
WidgetStats.defaultProps = {
  sparklineData: null,
  extraInfo: null,
};

export default WidgetStats;
