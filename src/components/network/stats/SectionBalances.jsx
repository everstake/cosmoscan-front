import React from 'react';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import Section from './Section';
import ColStyled from './ColStyled';


const SectionBalances = () => {
  // TODO: Store and compute data correctly
  const balances = [
    { title: 'Transaction volume', value: '120 777 222 ATOM' },
    { title: 'Fee volume', value: '120 777 222 ATOM' },
    { title: 'Total unbonding', value: '120 777 222 ATOM' },
    { title: 'Total burned', value: '120 777 222 ATOM' },
    { title: 'Highest fee block', value: '120 777' },
  ];

  return (
    <Section>
      <Title>
        Balances
      </Title>

      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
      >
        {balances.map((e) => (
          <ColStyled key={e.title}>
            <Card modifiers={['height100', 'flexCol']}>
              <Card.Body>
                <TitleMinor>
                  {e.title}
                </TitleMinor>
                <div>
                  {e.value}
                </div>
              </Card.Body>
            </Card>
          </ColStyled>
        ))}
      </Row>
    </Section>
  );
};

export default SectionBalances;
