import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import ColStyled from '../../styled/ColStyled';
import Section from './Section';
import WidgetStats from '../../../layouts/WidgetStats';
import { formatNum, formatSeconds } from '../../../utils';


// const healths = [
//   { title: 'Missed blocks', value: '120 777 222 ATOM' },
//   { title: 'Double sign evidence', value: '120 777 222 ATOM' },
// ];

const SectionHealth = ({ stats }) => {
  const { blockDelay, jailers } = stats;
  return (
    <Section>
      <Title>
        Health
      </Title>

      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
      >
        <ColStyled>
          <WidgetStats
            title="Block delay"
            isVertical
            mainInfo={blockDelay ? formatSeconds(blockDelay[blockDelay.length - 1]) : '---'}
            sparklineData={blockDelay ? blockDelay.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>
        <ColStyled>
          <WidgetStats
            title="Total jailed"
            isVertical
            mainInfo={jailers ? formatNum(Number(jailers[jailers.length - 1])) : '---'}
            sparklineData={jailers ? jailers.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>
      </Row>
    </Section>
  );
};

SectionHealth.propTypes = {
  stats: PropTypes.objectOf(PropTypes.array),
};
SectionHealth.defaultProps = {
  stats: {},
};


export default SectionHealth;
