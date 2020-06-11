import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { Container, Row } from '../../../components/styled/CustomBsGrid';
import Blocks from '../../../components/network/charts/Blocks';
import BlockDelay from '../../../components/network/charts/BlockDelay';
import Validators from '../../../components/network/charts/Validators';
import Operations from '../../../components/network/charts/Operations';
// import OperationsPerBlock from '../../../components/network/charts/OperationsPerBlock';
import DelegationVol from '../../../components/network/charts/DelegationVol';
import UndelegationVol from '../../../components/network/charts/UndelegationVol';

const ColStyled = styled(Col)`
  margin-bottom: ${({ theme: { marginSectionsStandard } }) => marginSectionsStandard};
`;

const Charts = () => (
  <Container>
    <Row xs={1} xl={2}>
      <ColStyled>
        <Blocks />
      </ColStyled>
      <ColStyled>
        <BlockDelay />
      </ColStyled>
      <ColStyled>
        <Validators />
      </ColStyled>
      <ColStyled>
        <Operations />
      </ColStyled>
      <ColStyled>
        <DelegationVol />
      </ColStyled>
      <ColStyled>
        <UndelegationVol />
      </ColStyled>
    </Row>
  </Container>
);

export default Charts;
