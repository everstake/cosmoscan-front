import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const initialState = {
  chain: 'cosmos',
};

const actions = {
  SET_CHAIN: 'SET_CHAIN',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_CHAIN:
      console.log(action.payload);
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
    if (!sessionStorage.getItem('chain')) {
      sessionStorage.setItem('chain', 'cosmos');
      window.location.replace('/cosmos');
      return {
        label: sessionStorage.getItem('chain').toLocaleUpperCase(),
        value: sessionStorage.getItem('chain'),
      };
    }

    dispatch({ type: 'SET_CHAIN', payload: sessionStorage.getItem('chain') });
    return {
      label: sessionStorage.getItem('chain').toLocaleUpperCase(),
      value: sessionStorage.getItem('chain'),
    };
  }, []);

  const providerData = useMemo(
    () => ({
      ...state,
      currentChain,
      setCurrentChain: (payload) => {
        dispatch({ type: 'SET_CHAIN', payload: payload.value });
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
