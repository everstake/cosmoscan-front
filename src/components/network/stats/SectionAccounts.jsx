import React from 'react';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import Section from './Section';
import ColStyled from './ColStyled';


const accs = [
  { title: 'Number of accounts', value: '120 777' },
  { title: 'Number of whale accounts (over 1m $)', value: '120 777' },
  { title: 'Number of small accounts (under 1 Atom)', value: '120 777' },
];

const SectionAccounts = () => (
  <Section>
    <Title>
      Accounts
    </Title>

    <Row
      xs={1}
      md={2}
      lg={3}
      xl={4}
    >
      {accs.map((e) => (
        <ColStyled key={e.title}>
          <Card modifiers={['height100', 'flexCol']}>
            <Card.Body modifiers={['flexCol']}>
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

export default SectionAccounts;
