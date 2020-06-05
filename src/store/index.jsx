// import React, {createContext, useContext, useReducer} from 'react';
// export const StateContext = createContext();
// export const StateProvider = ({reducer, initialState, children}) =>(
//   <StateContext.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </StateContext.Provider>
// );
// export const useStateValue = () => useContext(StateContext);


import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  stateValue: 'Hui value',
};

const actions = {
  SET_STATE_VALUE: 'SET_STATE_VALUE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_STATE_VALUE:
      return { ...state, stateValue: action.payload };
    default:
      throw new Error();
  }
};

const Store = createContext(initialState);

// export const StateProvider = ({ children }) => (
//   <Store.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </Store.Provider>
// );

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const providerData = {
    ...state,
    setStateValue: (payload) => {
      dispatch({ type: 'SET_STATE_VALUE', payload });
    },
  };
  return (
    <Store.Provider value={providerData}>
      {children}
    </Store.Provider>
  );
};
StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Store;
