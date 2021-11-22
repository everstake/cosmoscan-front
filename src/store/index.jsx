import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { networkList } from '../utils/constants';

const initialState = {
  chain: { label: 'COSMOS', value: 'cosmos', coinCode: 'ATOM' },
};

const actions = {
  SET_CHAIN: 'SET_CHAIN',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_CHAIN:
      return {
        ...state,
        chain: action.payload,
      };
    default:
      return state;
  }
};

const Store = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const currentChain = useMemo(() => {
    let currChain = networkList.find((e) =>
      history.location.pathname.match(e.value),
    );

    currChain = currChain || initialState.chain;

    sessionStorage.setItem('chain', currChain.value);

    dispatch({ type: 'SET_CHAIN', payload: currChain });

    return currChain;
  }, [history]);

  const providerData = useMemo(
    () => ({
      ...state,
      currentChain,
      setCurrentChain: (payload) => {
        dispatch({ type: 'SET_CHAIN', payload });
        sessionStorage.setItem('chain', payload.value);
        history.replace(`/${payload.value}`);
      },
    }),
    [currentChain, history, state],
  );
  return <Store.Provider value={providerData}>{children}</Store.Provider>;
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Store;
