import React from 'react';
import styled from 'styled-components';
import banner from '../assets/img/banner.png';
import { Container } from './styled/CustomBsGrid';

const Banner = styled.div`
  display: block;
  padding: 30px 0 5px;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  box-shadow: 0 1px 7px rgb(0 0 0 / 4%);
  border-radius: 8px;
`;

const ImageDesctop = styled(Image)`
  //@media (max-width: 767px) {
  //  display: none;
  //}
`;

const BannerComponent = () => (
  <Container>
    <Banner>
      <a
        href="https://aff.everstake.one/?utm_campaign=partner&utm_content=Keplr&utm_medium=Cosmos&utm_source=Cosmoscan&utm_term=1665078254"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ImageDesctop src={banner} alt="gravidex" />
      </a>
    </Banner>
  </Container>
);

export default BannerComponent;
