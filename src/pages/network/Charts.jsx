import React from 'react';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import ColMarginStandard from '../../components/styled/ColMarginStabdard';
import Blocks from '../../components/network/charts/Blocks';
import BlockDelay from '../../components/network/charts/BlockDelay';
import Validators from '../../components/network/charts/Validators';
import Operations from '../../components/network/charts/Operations';
// import OperationsPerBlock from '../../../components/network/charts/OperationsPerBlock';
import DelegationVol from '../../components/network/charts/DelegationVol';
import UndelegationVol from '../../components/network/charts/UndelegationVol';

const Charts = () => (
  <Container>
    <Row xs={1} xl={2}>
      <ColMarginStandard>
        <Blocks />
      </ColMarginStandard>
      <ColMarginStandard>
        <BlockDelay />
      </ColMarginStandard>
      <ColMarginStandard>
        <Validators />
      </ColMarginStandard>
      <ColMarginStandard>
        <Operations />
      </ColMarginStandard>
      <ColMarginStandard>
        <DelegationVol />
      </ColMarginStandard>
      <ColMarginStandard>
        <UndelegationVol />
      </ColMarginStandard>
    </Row>
  </Container>
);

export default Charts;
