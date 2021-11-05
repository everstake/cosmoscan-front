import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppHeader from '../components/App/AppHeader';
import AppTopStats from '../components/App/AppTopStats';
import AppFooter from '../components/App/AppFooter';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.div`
  flex: 1 0 auto;
  background-color: ${({ theme }) => theme.whiteGrey};
  padding: ${({ theme }) => theme.marginSectionsStandard} 0;
`;

const LayoutDefault = ({ children }) => (
  <AppWrapper>
    <AppHeader />
    <AppTopStats />

    <AppContent>{children}</AppContent>

    <AppFooter />
  </AppWrapper>
);

LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutDefault;
