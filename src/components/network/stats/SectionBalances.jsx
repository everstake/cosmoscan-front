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
import { formatATOM } from '../../../utils';


// const balances = [
//   { title: 'Transaction volume', value: '120 777 222 ATOM' },
//   { title: 'Fee volume', value: '120 777 222 ATOM' },
//   { title: 'Total unbonding', value: '120 777 222 ATOM' },
//   { title: 'Total burned', value: '120 777 222 ATOM' },
//   { title: 'Highest fee block', value: '120 777' },
// ];

const SectionBalances = ({ stats }) => {
  const [period, setPeriod] = useState(periodOptsStats[2].value);

  return (
    <Section>
      <Title>
        Balances
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
                Transaction volume
              </TitleMinor>
              <div>
                { stats.txVol ? formatATOM(Number(stats.txVol[period])) : '-----' }
              </div>
            </Card.Body>
          </Card>
        </ColStyled>

        <ColStyled>
          <Card modifiers={['height100', 'flexCol']}>
            <Card.Body>
              <TitleMinor>
                Fee volume
              </TitleMinor>
              <div>
                { stats.feeVol ? formatATOM(Number(stats.feeVol[period])) : '-----' }
              </div>
            </Card.Body>
          </Card>
        </ColStyled>

        <ColStyled>
          <Card modifiers={['height100', 'flexCol']}>
            <Card.Body>
              <TitleMinor>
                Total unbonding
              </TitleMinor>
              <div>
                { stats.unbond ? formatATOM(Number(stats.unbond[period])) : '-----' }
              </div>
            </Card.Body>
          </Card>
        </ColStyled>

        <ColStyled>
          <Card modifiers={['height100', 'flexCol']}>
            <Card.Body>
              <TitleMinor>
                Highest fee block
              </TitleMinor>
              <div>
                { stats.highestFee ? formatATOM(Number(stats.highestFee[period])) : '-----' }
              </div>
            </Card.Body>
          </Card>
        </ColStyled>
      </Row>
    </Section>
  );
};

SectionBalances.propTypes = {
  stats: PropTypes.objectOf(PropTypes.object),
};
SectionBalances.defaultProps = {
  stats: {},
};

export default SectionBalances;
