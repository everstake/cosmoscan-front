import React from 'react';
import styled from 'styled-components';
import { Container } from '../styled/CustomBsGrid';
import AppNav from './AppNav';
import AppLogo from './AppLogo';
import AppMenu from './AppMenu';

const Header = styled.header`
  height: ${({ theme }) => theme.heightHeader};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
  background-color: ${({ theme }) => theme.white};
  border-bottom: ${({ theme: { border } }) => border};
`;

const Inner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  margin-right: 75px;
  
  @media(max-width: ${({ theme }) => theme.xlDown}) {
      margin-right: 45px;
    }
`;

const AppHeader = () => (
  <Header>
    <Inner>
      <div className="d-flex">
        <LogoWrapper>
          <AppLogo />
        </LogoWrapper>

        <div className="d-none d-md-flex">
          <AppNav />
        </div>
      </div>
      <div className="d-none d-md-flex">
        {/*  TODO: Settings buttons  */}
      </div>
      <div className="d-md-none">
        <AppMenu />
      </div>
    </Inner>
  </Header>
);

export default AppHeader;
