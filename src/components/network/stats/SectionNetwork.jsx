import React from 'react';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import Section from './Section';
import ColStyled from './ColStyled';
import Percent from '../../Percent';

const SectionNetwork = () => {
  // TODO: Store and compute data correctly
  const networkStats = [
    { title: 'Total staking balance', value: '120 777 222 ATOM' },
    { title: 'Number of delegators', value: '120 777' },
    { title: 'Number of multidelegators', value: '120 777' },
    { title: 'Network size', value: '120 777' },
    { title: 'Proposal voting', value: '40%' },
  ];

  return (
    <Section>
      <Title>
        Network
      </Title>

      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
      >
        {networkStats.map((e) => (
          <ColStyled key={e.title}>
            <Card modifiers={['height100', 'flexCol']}>
              <Card.Body>
                <TitleMinor>
                  {e.title}
                </TitleMinor>
                <div>
                  <span className="d-flex justify-content-between">
                    <span>
                      {e.value}
                    </span>
                    <span>
                      <Percent prevVal={1} currVal={0.82} />
                    </span>
                  </span>
                </div>
              </Card.Body>
            </Card>
          </ColStyled>
        ))}
      </Row>
    </Section>
  );
};

export default SectionNetwork;
