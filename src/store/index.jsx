import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { networkList } from '../utils/constants';

const initialState = {
  chain: { label: 'BITSONG', value: 'bitsong', coinCode: 'BTSG' },
};

const Store = createContext({
  state: initialState,
});

export const StateProvider = ({ children }) => {
  const [chain, setChain] = useState();
  const history = useHistory();
  const local = useLocation();

  const currentChain = useMemo(() => {
    let currChain = networkList.find((e) => local.pathname.match(e.value));

    currChain = currChain || initialState.chain;

    sessionStorage.setItem('chain', currChain.value);

    setChain(currChain);

    return currChain;
  }, [local]);

  const setCurrentChain = (payload) => {
    setChain(payload);
    sessionStorage.setItem('chain', payload.value);
    history.replace(`/${payload.value}`);
  };

  const providerData = useMemo(
    () => ({
      currentChain,
      chain,
      setCurrentChain,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentChain, history, chain],
  );
  return <Store.Provider value={providerData}>{children}</Store.Provider>;
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Store;
