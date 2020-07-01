import React from 'react';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import ColMarginStandard from '../../components/styled/ColMarginStabdard';
import BlocksProposed from '../../components/validators/charts/BlocksProposed';
import Jailed from '../../components/validators/charts/Jailed';
import FeeRanges from '../../components/validators/charts/FeeRanges';
import Delegators from '../../components/validators/charts/Delegators';

const Charts = () => (
  <Container>
    <Row xs={1} xl={2}>
      <ColMarginStandard>
        <BlocksProposed />
      </ColMarginStandard>
      <ColMarginStandard>
        <Jailed />
      </ColMarginStandard>
      <ColMarginStandard>
        <FeeRanges />
      </ColMarginStandard>
      <ColMarginStandard>
        <Delegators />
      </ColMarginStandard>
    </Row>
  </Container>
);

export default Charts;
