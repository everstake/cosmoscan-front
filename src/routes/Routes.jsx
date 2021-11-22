import React, { useContext } from 'react';
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
import Blocks from '../pages/blocks/Blocks';
import Transactions from '../pages/transactions/Transactions';
import BlockDetails from '../pages/blocks/BlockDetails';
import TransactionDetails from '../pages/transactions/TransactionDetails';
import AccountDetails from '../pages/AccountDetails';
import { networkList } from '../utils/constants';
import Store from '../store';

const Routes = () => {
  const { chain } = useContext(Store);

  return (
    <>
      <ScrollToTop />
      <Switch>
        {networkList.map((e) => (
          <Route exact key={e.value} path={`/${e.value}`} component={Home} />
        ))}

        {/* TODO: Create routes config */}
        {/* <Route exact path={`/${chain}`} component={Home} /> */}

        <Redirect exact from="/" to={`/${chain.value}`} />
        <Route exact path={`/${chain.value}/blocks`} component={Blocks} />
        <Route
          exact
          path={`/${chain.value}/block/:id`}
          component={BlockDetails}
        />
        <Route
          exact
          path={`/${chain.value}/transactions`}
          component={Transactions}
        />
        <Route
          exact
          path={`/${chain.value}/transaction/:id`}
          component={TransactionDetails}
        />
        <Route
          exact
          path={`/${chain.value}/network-stats`}
          component={NetworkStats}
        />
        <Route
          exact
          path={`/${chain.value}/network-charts`}
          component={NetworkCharts}
        />
        <Route
          exact
          path={`/${chain.value}/governance-stats`}
          component={GovernanceStats}
        />
        <Route
          exact
          path={`/${chain.value}/proposal/:id`}
          component={Proposal}
        />
        <Route
          exact
          path={`/${chain.value}/governance-charts`}
          component={GovernanceCharts}
        />
        <Route
          exact
          path={`/${chain.value}/validators-stats`}
          component={ValidatorsStats}
        />
        <Route
          exact
          path={`/${chain.value}/validators-charts`}
          component={ValidatorsCharts}
        />
        <Route
          exact
          path={`/${chain.value}/validator/:address`}
          component={Validator}
        />
        <Route
          exact
          path={`/${chain.value}/account/:address`}
          component={AccountDetails}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;
