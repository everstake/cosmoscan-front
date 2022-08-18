import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from '../components/styled/Card';
import TitleMinor from '../components/styled/TitleMinor';
import Sparkline from '../components/chart-types/Sparkline';
import Percent from '../components/Percent';
import ChartWrapper from './ChartWrapper';
import useChartDownload from '../hooks/useChartDownload';

const CardBodyWidget = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetItem = styled.div`
  display: flex;
  justify-content: space-between;
  word-break: break-all;
  flex-direction: ${({ isVertical }) => (isVertical ? 'column' : 'row')};
  row-gap: 10px;

  &:not(:first-child) {
    align-items: flex-end;
    justify-content: space-between;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const WidgetFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WidgetStats = ({
  title,
  mainInfo,
  sparklineData,
  extraInfo,
  isVertical,
  tooltip,
}) => {
  const theme = useContext(ThemeContext);
  const { ref, handleDownload } = useChartDownload();

  return (
    <ChartWrapper title={title} handleDownload={handleDownload}>
      <>
        <Card modifiers="height100" ref={ref}>
          <CardBodyWidget>
            <WidgetItem isVertical={isVertical}>
              {tooltip ? (
                <OverlayTrigger
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="title-tooltip">{tooltip}</Tooltip>}
                >
                  <TitleMinor>{title}</TitleMinor>
                </OverlayTrigger>
              ) : (
                <TitleMinor>{title}</TitleMinor>
              )}
              <div>
                {sparklineData && sparklineData.length > 1 && (
                  <Sparkline
                    data={sparklineData}
                    color={
                      sparklineData[sparklineData.length - 1].y >
                      sparklineData[0].y
                        ? theme.success
                        : theme.danger
                    }
                  />
                )}
              </div>
            </WidgetItem>

            <WidgetFooter>
              <div>{mainInfo}</div>
              {sparklineData && sparklineData.length && (
                <Percent
                  prevVal={sparklineData[0].y}
                  currVal={sparklineData[sparklineData.length - 1].y}
                />
              )}
              {extraInfo}
            </WidgetFooter>
          </CardBodyWidget>
        </Card>
      </>
    </ChartWrapper>
  );
};

WidgetStats.propTypes = {
  title: PropTypes.string.isRequired,
  mainInfo: PropTypes.node,
  sparklineData: PropTypes.arrayOf(PropTypes.object),
  extraInfo: PropTypes.node,
  isVertical: PropTypes.bool,
  tooltip: PropTypes.string,
};

WidgetStats.defaultProps = {
  mainInfo: '---',
  sparklineData: null,
  extraInfo: null,
  isVertical: false,
  tooltip: '',
};

export default WidgetStats;
