import React, { useContext } from 'react';
import styled from 'styled-components';
import { Container } from '../styled/CustomBsGrid';
import AppNav from './AppNav';
import AppLogo from './AppLogo';
import AppMenu from './AppMenu';
import Store from '../../store';

const Header = styled.header`
  height: ${({ theme }) => theme.heightHeader};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 5;
  background-color: ${({ theme, bg }) =>
    theme.bgHeaderColor[bg.value] || theme.bgHeaderColor.cosmos};
  border-bottom: ${({ theme: { border } }) => border};
`;

const Inner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  width: 100%;
`;

const LogoWrapper = styled.div`
  margin-right: 75px;

  @media (max-width: ${({ theme }) => theme.xlDown}) {
    margin-right: 10px;
  }
`;

const AppHeader = () => {
  const { chain } = useContext(Store);

  return (
    <Header bg={chain}>
      <Inner>
        <div className="d-flex w-100">
          <LogoWrapper>
            <AppLogo />
          </LogoWrapper>

          <div className="d-none d-lg-flex w-100">
            <AppNav />
          </div>
        </div>
        <div className="d-none d-lg-flex">{/*  TODO: Settings buttons  */}</div>
        <div className="d-lg-none">
          <AppMenu />
        </div>
      </Inner>
    </Header>
  );
};

export default AppHeader;
