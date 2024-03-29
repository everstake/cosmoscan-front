import React from 'react';
import styled from 'styled-components';
import banner from '../assets/img/banner.png';
// import persistenceBanner from '../assets/img/persistence-banner.png';
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

const BannerComponent = () => {
  return (
    <Container>
      <Banner>
        <a
          href="https://stake.is/7b457258"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={banner} alt="Banner" />
        </a>
      </Banner>
    </Container>
  );
};

export default BannerComponent;
