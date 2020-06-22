import React from 'react';
import { Row } from '../../styled/CustomBsGrid';
import Section from './Section';
import ColStyled from '../../styled/ColStyled';
import VotingPower from './VotingPower';

const SectionChart = () => (
  <Section>
    <Row lg={1}>
      <ColStyled>
        <VotingPower />
      </ColStyled>
    </Row>
  </Section>
);

export default SectionChart;
