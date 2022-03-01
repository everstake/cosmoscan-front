import React from 'react';
import styled from 'styled-components';
import banner from '../assets/img/banner.jpg';
import bannerMobile from '../assets/img/banner-mobile.jpg';
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
  @media (max-width: 767px) {
    display: none;
  }
`;

const ImageMobile = styled(Image)`
  @media (min-width: 767px) {
    display: none;
  }
`;

const BannerComponent = () => (
  <Container>
    <Banner>
      <a
        href="https://nation.io/dao/ukraine"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ImageDesctop src={banner} alt="gravidex" />
        <ImageMobile src={bannerMobile} alt="gravidex" />
      </a>
    </Banner>
  </Container>
);

export default BannerComponent;
