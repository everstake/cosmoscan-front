import React from 'react';
import styled from 'styled-components';
import banner from '../assets/img/mobile.png';

const Banner = styled.div`
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerComponent = () => (
  <Banner>
    <a
      href="https://cosmos.network/gravity-dex/?utm_source=cosmoscan&utm_medium=cpc&utm_campaign=gravitydex_launch&utm_term=gravitydex&utm_content=paid_banner"
      target="_blank"
      rel="noreferrer"
    >
      <img src={banner} alt="gravidex" style={{ width: '100%' }} />
    </a>
  </Banner>
);

export default BannerComponent;
