import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { networkList } from '../utils/constants';
import {
  useChainsDispatchContext,
  useChainsStateContext,
} from '../store/chainContext';

const SelectPersist = styled(Select)`
  width: 155px;
`;

const SelectChain = () => {
  const { currentChain } = useChainsStateContext();
  const { handleSwitchChain } = useChainsDispatchContext();

  return (
    <>
      <SelectPersist
        options={networkList}
        defaultValue={currentChain}
        onChange={(e) => handleSwitchChain(e)}
        isSearchable={false}
      />
    </>
  );
};

export default SelectChain;
