import React from 'react';
import styled from 'styled-components';
import TxVol from './charts/TxVol';
import BondedRatio from './charts/BondedRatio';

const MainChartsItem = styled.div`
 flex: 0 0 50%;
 max-width: 50%;
 width: 100%;
 padding: 5px;
 
 @media(max-width: ${({ theme }) => theme.xlDown}) {
   flex: initial;
   max-width: initial;
 }
`;

const MainCharts = () => (
  <MainChartsContainer>
    <MainChartsItem>
      <TxVol />
    </MainChartsItem>
    <MainChartsItem>
      <BondedRatio />
    </MainChartsItem>
  </MainChartsContainer>
);

const MainChartsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.marginSectionsStandard};
  margin-left: -5px;
  margin-right: -5px;
  flex-wrap: wrap;
`;

export default MainCharts;
