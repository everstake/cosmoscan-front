import React, { useContext } from 'react';
import Select from 'react-select';
import { networkList } from '../utils/constants';
import theme from '../utils/theme';
import Store from '../store';

const stylesChain = {
  container: (base) => ({
    ...base,
    minWidth: 140,
    fontSize: '12px',
  }),
  control: (base) => ({
    ...base,
    minHeight: 30,
    height: 30,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.blue4,
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: 30,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: theme.black,
  }),
  option: (base, state) => ({
    ...base,
    padding: '4px 10px',
    backgroundColor: state.isSelected ? theme.blue : 'transparent',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: !state.isSelected ? theme.blue4 : '',
    },
    '&:active': {
      backgroundColor: theme.blue4,
    },
  }),
};

const SelectChain = () => {
  const { setCurrentChain, currentChain } = useContext(Store);

  return (
    <>
      <Select
        options={networkList}
        defaultValue={currentChain}
        onChange={(e) => {
          setCurrentChain(e);
        }}
        isSearchable={false}
        styles={stylesChain}
      />
    </>
  );
};

export default SelectChain;
