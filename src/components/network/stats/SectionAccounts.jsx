import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import ColStyled from '../../styled/ColStyled';
import Section from './Section';
import WidgetStats from '../../../layouts/WidgetStats';
import { formatNum } from '../../../utils';
import useCoinFormatter from '../../../hooks/useCoinFormatter';

const SectionAccounts = ({ stats }) => {
  const { accs, whales, smallAccs } = stats;
  const coin = useCoinFormatter();

  return (
    <Section>
      <Title>Accounts</Title>

      <Row xs={1} md={2} lg={3} xl={4}>
        <ColStyled>
          <WidgetStats
            title="# of accounts"
            isVertical
            mainInfo={accs ? formatNum(Number(accs[accs.length - 1])) : '---'}
            sparklineData={accs ? accs.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>
        <ColStyled>
          <WidgetStats
            title="# of whale accounts (over 1m $)"
            isVertical
            mainInfo={
              whales ? formatNum(Number(whales[whales.length - 1])) : '---'
            }
            sparklineData={whales ? whales.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>
        <ColStyled>
          <WidgetStats
            title={`# of small accounts (under 1 ${coin})`}
            isVertical
            mainInfo={
              smallAccs
                ? formatNum(Number(smallAccs[smallAccs.length - 1]))
                : '---'
            }
            sparklineData={smallAccs ? smallAccs.map((e) => ({ y: +e })) : []}
          />
        </ColStyled>
      </Row>
    </Section>
  );
};

SectionAccounts.propTypes = {
  stats: PropTypes.objectOf(PropTypes.array),
};
SectionAccounts.defaultProps = {
  stats: {},
};

export default SectionAccounts;
