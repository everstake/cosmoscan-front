import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
// TODO: Add dynamic imports
import Home from '../pages/Home';
import NetworkStats from '../pages/network/Stats';
import NetworkCharts from '../pages/network/Charts';
import GovernanceStats from '../pages/governance/Stats';
import Proposal from '../pages/governance/Proposal';
import GovernanceCharts from '../pages/governance/Charts';
import ValidatorsStats from '../pages/validators/Stats';
import ValidatorsCharts from '../pages/validators/Charts';
// import Validator from '../pages/Validator';
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
      <Route
        exact
        path="/proposal/:id"
        component={Proposal}
      />
      <Route
        exact
        path="/governance-charts"
        component={GovernanceCharts}
      />
      <Route
        exact
        path="/validators-stats"
        component={ValidatorsStats}
      />
      <Route
        exact
        path="/validators-charts"
        component={ValidatorsCharts}
      />
      {/* <Route */}
      {/*  exact */}
      {/*  path="/validator" */}
      {/*  component={Validator} */}
      {/* /> */}
      <Route
        component={NotFound}
      />
    </Switch>
  </>
);

export default Routes;
