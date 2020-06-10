import React from 'react';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import Section from './Section';
import ColStyled from './ColStyled';


const healths = [
  { title: 'Block delay', value: '120 777 222 ATOM' },
  { title: 'Missed blocks', value: '120 777 222 ATOM' },
  { title: 'Total unbonding', value: '120 777 222 ATOM' },
  { title: 'Double sign evidence', value: '120 777 222 ATOM' },
  { title: 'Slashing evidence', value: '120 777' },
];

const SectionHealth = () => (
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
      {healths.map((e) => (
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

export default SectionHealth;
