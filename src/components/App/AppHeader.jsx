import React from 'react';
import styled from 'styled-components';
import { Container } from '../styled/CustomBsGrid';
import AppNav from './AppNav';
import AppLogo from './AppLogo';
import AppMenu from './AppMenu';
import { useChainsStateContext } from '../../store/chainContext';

const Header = styled.header`
  height: ${({ theme }) => theme.heightHeader};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 5;
  background-color: ${({ theme, bg }) =>
    !bg ? theme.bgHeaderColor.cosmos : theme.bgHeaderColor[bg]};
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
    margin-right: 45px;
  }
`;

const AppHeader = () => {
  const { chain } = useChainsStateContext();

  return (
    <Header bg={chain}>
      <Inner>
        <div className="d-flex w-100">
          <LogoWrapper>
            <AppLogo />
          </LogoWrapper>

          <div className="d-none d-md-flex w-100">
            <AppNav />
          </div>
        </div>
        <div className="d-none d-md-flex">{/*  TODO: Settings buttons  */}</div>
        <div className="d-md-none">
          <AppMenu />
        </div>
      </Inner>
    </Header>
  );
};

export default AppHeader;
