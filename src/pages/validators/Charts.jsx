import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import ColMarginStandard from '../../components/styled/ColMarginStabdard';
import BlocksProposed from '../../components/validators/charts/BlocksProposed';
import Jailed from '../../components/validators/charts/Jailed';
import FeeRanges from '../../components/validators/charts/FeeRanges';
import Delegators from '../../components/validators/charts/Delegators';

const Charts = () => (
  <Container>
    <Helmet>
      <title>Cosmos validators charts | Cosmoscan</title>
      <meta
        name="description"
        content="Comparative charts with validator stats."
      />
      <meta
        itemProp="description"
        content="Comparative charts with validator stats."
      />
      <meta
        property="og:description"
        content="Comparative charts with validator stats."
      />
      <meta
        name="twitter:description"
        content="Comparative charts with validator stats."
      />
    </Helmet>

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
