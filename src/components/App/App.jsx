import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styled/GlobalStyles';
import theme from '../../utils/theme';
import LayoutDefault from '../../layouts/LayoutDefault';
import Routes from '../../routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../plugins/faLibrary';
import { StateProvider } from '../../store';

const App = () => (
  <Router>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Normalize />
        <GlobalStyles />
        <StateProvider>
          <LayoutDefault>
            <Routes />
          </LayoutDefault>
        </StateProvider>
      </ThemeProvider>
    </HelmetProvider>
  </Router>
);

export default App;
