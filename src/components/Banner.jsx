import React, { useContext } from 'react';
import styled from 'styled-components';
import banner from '../assets/img/banner.png';
import persistenceBanner from '../assets/img/persistence-banner.png';
import { Container } from './styled/CustomBsGrid';
import Store from '../store';

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
  const { chain } = useContext(Store);

  switch (chain.value) {
    case 'persistence':
      return (
        <Container>
          <Banner>
            <a
              href="https://pstake.finance/atom?utm_source=Everstake&utm_medium=Banner&utm_campaign=Banner_cosmoscan&utm_id=3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={persistenceBanner} alt="Banner" />
            </a>
          </Banner>
        </Container>
      );
    default:
      return (
        <Container>
          <Banner>
            <a
              href="https://aff.everstake.one/?utm_campaign=partner&utm_content=Keplr&utm_medium=Cosmos&utm_source=Cosmoscan&utm_term=1665078254"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={banner} alt="Banner" />
            </a>
          </Banner>
        </Container>
      );
  }
};

export default BannerComponent;
