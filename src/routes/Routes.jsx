import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import Validator from '../pages/validators/Validator';
import NotFound from '../pages/NotFound';
import { networkList } from '../utils/constants';
import { useChainsStateContext } from '../store/chainContext';

const Routes = () => {
  const { chain } = useChainsStateContext();
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* TODO: Create routes config */}
        <Route exact path={`/${chain}`} component={Home} />

        <Redirect exact from="/" to={`/${chain}`} />

        {networkList.map((e) => (
          <Route exact key={e.value} path={`/${e.value}`} component={Home} />
        ))}
        <Route
          exact
          path={`/${chain}/network-stats`}
          component={NetworkStats}
        />
        <Route
          exact
          path={`/${chain}/network-charts`}
          component={NetworkCharts}
        />
        <Route
          exact
          path={`/${chain}/governance-stats`}
          component={GovernanceStats}
        />
        <Route exact path={`/${chain}/proposal/:id`} component={Proposal} />
        <Route
          exact
          path={`/${chain}/governance-charts`}
          component={GovernanceCharts}
        />
        <Route
          exact
          path={`/${chain}/validators-stats`}
          component={ValidatorsStats}
        />
        <Route
          exact
          path={`/${chain}/validators-charts`}
          component={ValidatorsCharts}
        />
        <Route
          exact
          path={`/${chain}/validator/:address`}
          component={Validator}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;
