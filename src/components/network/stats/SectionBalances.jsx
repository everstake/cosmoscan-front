import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import ColStyled from '../../styled/ColStyled';
import Section from './Section';
import WidgetStats from '../../../layouts/WidgetStats';
import { formatToken } from '../../../utils';

// const balances = [
//   { title: 'Total burned', value: '120 777 222 ATOM' },
// ];

const SectionBalances = ({ stats }) => {
  const { txVol, feeVol, unbond, highestFee } = stats;
  return (
    <Section>
      <Title>Balances</Title>

      <Row xs={1} md={2} lg={3} xl={4}>
        <ColStyled>
          <WidgetStats
            title="Transfer volume"
            isVertical
            mainInfo={txVol ? formatToken(txVol[txVol.length - 1]) : '---'}
            sparklineData={txVol ? txVol.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>

        <ColStyled>
          <WidgetStats
            title="Fee volume"
            isVertical
            mainInfo={feeVol ? formatToken(feeVol[feeVol.length - 1]) : '---'}
            sparklineData={feeVol ? feeVol.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>

        <ColStyled>
          <WidgetStats
            title="Total unbonding"
            isVertical
            mainInfo={unbond ? formatToken(unbond[unbond.length - 1]) : '---'}
            sparklineData={unbond ? unbond.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>

        <ColStyled>
          <WidgetStats
            title="Highest fee block"
            isVertical
            mainInfo={
              highestFee
                ? formatToken(highestFee[highestFee.length - 1])
                : '---'
            }
            sparklineData={highestFee ? highestFee.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>
      </Row>
    </Section>
  );
};

SectionBalances.propTypes = {
  stats: PropTypes.objectOf(PropTypes.array),
};
SectionBalances.defaultProps = {
  stats: {},
};

export default SectionBalances;
