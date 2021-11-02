import { useMemo, useContext } from 'react';
import { networkList } from '../utils/constants';
import Store from '../store';

const useCoinFormatter = () => {
  const { chain } = useContext(Store);
  return useMemo(() => networkList.find((e) => e.value === chain).coinCode, [
    chain,
  ]);
};

export default useCoinFormatter;
