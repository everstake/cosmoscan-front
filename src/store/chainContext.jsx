import React, { useState, useMemo, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ChainsStateContext = createContext(undefined);
ChainsStateContext.displayName = 'ChainsStateContext';
const useChainsStateContext = () => {
  const context = useContext(ChainsStateContext);

  if (!context) {
    throw new Error(
      'useChainsStateContext must be used within a ChainsStateContext',
    );
  }

  return context;
};

const ChainsDispatchContext = createContext(undefined);
ChainsDispatchContext.displayName = 'ChainsDispatchContext';
const useChainsDispatchContext = () => {
  const context = useContext(ChainsDispatchContext);

  if (!context) {
    throw new Error(
      'useChainDispatchContext must be used within a ChainDispatchContext',
    );
  }

  return context;
};

const ChainsProvider = ({ children }) => {
  const [chain, setChain] = useState('');
  const history = useHistory();

  const currentChain = useMemo(() => {
    if (!sessionStorage.getItem('chain')) {
      sessionStorage.setItem('chain', 'cosmos');
      setChain(sessionStorage.getItem('cosmos'));
      history.replace('/cosmos');
      return {
        label: sessionStorage.getItem('chain').toLocaleUpperCase(),
        value: sessionStorage.getItem('chain'),
      };
    }

    setChain(sessionStorage.getItem('chain'));
    return {
      label: sessionStorage.getItem('chain').toLocaleUpperCase(),
      value: sessionStorage.getItem('chain'),
    };
  }, [history]);

  const handleSwitchChain = (e) => {
    switch (e.value) {
      case 'cosmos':
        setChain(e.value);
        sessionStorage.setItem('chain', 'cosmos');
        break;
      case 'persistence':
        setChain(e.value);
        sessionStorage.setItem('chain', 'persistence');
        break;
      default:
    }
    history.replace(`/${e.value}`);
  };

  const stateValue = useMemo(() => {
    return {
      chain,
      currentChain,
    };
  }, [chain, currentChain]);

  const stateDispatch = useMemo(() => {
    return {
      handleSwitchChain,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChainsStateContext.Provider value={stateValue}>
      <ChainsDispatchContext.Provider value={stateDispatch}>
        {children}
      </ChainsDispatchContext.Provider>
    </ChainsStateContext.Provider>
  );
};

ChainsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ChainsProvider, useChainsStateContext, useChainsDispatchContext };
