import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import ColStyled from '../../styled/ColStyled';
import Section from './Section';
import WidgetStats from '../../../layouts/WidgetStats';
import { formatToken, formatNum, formatGB } from '../../../utils';

// const networkStats = [
//   { title: 'Proposal voting', value: '40%' },
// ];

const SectionNetwork = ({ stats }) => {
  const {
    stakingBal,
    delegators,
    multiDelegators,
    totalDelegators,
    networkSize,
  } = stats;
  return (
    <Section>
      <Title>Network</Title>

      <Row xs={1} md={2} lg={3} xl={4}>
        <ColStyled>
          <WidgetStats
            title="Total bonded balance"
            isVertical
            mainInfo={
              stakingBal
                ? formatToken(stakingBal[stakingBal.length - 1])
                : '---'
            }
            sparklineData={stakingBal ? stakingBal.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>
        <ColStyled>
          <WidgetStats
            title="Total # of delegators"
            isVertical
            mainInfo={
              totalDelegators
                ? formatNum(totalDelegators[totalDelegators.length - 1])
                : '---'
            }
            sparklineData={
              totalDelegators ? totalDelegators.map((e) => ({ y: +e })) : []
            }
          />
        </ColStyled>
        <ColStyled>
          <WidgetStats
            title="# of new delegators"
            isVertical
            mainInfo={
              delegators ? formatNum(delegators[delegators.length - 1]) : '---'
            }
            sparklineData={delegators ? delegators.map((e) => ({ y: +e })) : []}
            tooltip="Delegators who bonded or unbonded ATOM within last 24h"
          />
        </ColStyled>
        <ColStyled>
          <WidgetStats
            title="# of multi-delegators"
            isVertical
            mainInfo={
              multiDelegators
                ? formatNum(multiDelegators[multiDelegators.length - 1])
                : '---'
            }
            sparklineData={
              multiDelegators ? multiDelegators.map((e) => ({ y: +e })) : []
            }
          />
        </ColStyled>
        <ColStyled>
          <WidgetStats
            title="Network size"
            isVertical
            mainInfo={
              networkSize
                ? formatGB(networkSize[networkSize.length - 1])
                : '---'
            }
            sparklineData={
              networkSize ? networkSize.map((e) => ({ y: +e })) : []
            }
          />
        </ColStyled>
      </Row>
    </Section>
  );
};
SectionNetwork.propTypes = {
  stats: PropTypes.objectOf(PropTypes.array),
};
SectionNetwork.defaultProps = {
  stats: {},
};

export default SectionNetwork;
