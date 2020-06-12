import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import Section from './Section';
import ColStyled from './ColStyled';
import SelectPeriodStyled from './SelectPeriodStyled';
import { periodOptsStats } from '../../../utils/constants';
import { formatSeconds } from '../../../utils';


// const healths = [
//   { title: 'Block delay', value: '120 777 222 ATOM' },
//   { title: 'Missed blocks', value: '120 777 222 ATOM' },
//   { title: 'Double sign evidence', value: '120 777 222 ATOM' },
//   { title: 'Slashing evidence', value: '120 777' },
// ];

const SectionHealth = ({ stats }) => {
  const [period, setPeriod] = useState(periodOptsStats[2].value);

  return (
    <Section>
      <Title>
        Health
      </Title>

      <SelectPeriodStyled
        opts={periodOptsStats}
        onChange={setPeriod}
      />

      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
      >
        <ColStyled>
          <Card modifiers={['height100', 'flexCol']}>
            <Card.Body>
              <TitleMinor>
                Block delay
              </TitleMinor>
              <div>
                { stats.blockDelay ? formatSeconds(Number(stats.blockDelay[period])) : '-----' }
              </div>
            </Card.Body>
          </Card>
        </ColStyled>
      </Row>
    </Section>
  );
};

SectionHealth.propTypes = {
  stats: PropTypes.objectOf(PropTypes.object),
};
SectionHealth.defaultProps = {
  stats: {},
};


export default SectionHealth;
