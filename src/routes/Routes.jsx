import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
// TODO: Add dynamic imports
import Home from '../pages/home';
import NetworkStats from '../pages/network/stats';
import NetworkCharts from '../pages/network/charts';
import GovernanceStats from '../pages/governance/Stats';
// import Proposal from '../pages/governance/Proposal';
// import Trading from '../pages/trading';
// import Validator from '../pages/validator';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <>
    <ScrollToTop />
    <Switch>
      {/* TODO: Create routes config */}
      <Route
        exact
        path="/"
        component={Home}
      />
      {/* <Route */}
      {/*  exact */}
      {/*  path="/trading" */}
      {/*  component={Trading} */}
      {/* /> */}
      <Route
        exact
        path="/network-stats"
        component={NetworkStats}
      />
      <Route
        exact
        path="/network-charts"
        component={NetworkCharts}
      />
      <Route
        exact
        path="/governance-stats"
        component={GovernanceStats}
      />
      {/* <Route */}
      {/*  exact */}
      {/*  path="/validator" */}
      {/*  component={Validator} */}
      {/* /> */}
      {/* <Route */}
      {/*  exact */}
      {/*  path="/proposal" */}
      {/*  component={Proposal} */}
      {/* /> */}
      <Route
        component={NotFound}
      />
    </Switch>
  </>
);

export default Routes;
