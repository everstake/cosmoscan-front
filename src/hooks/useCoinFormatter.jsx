import { useMemo, useContext } from 'react';
// import { networkList } from '../utils/constants';
import Store from '../store';

const useCoinFormatter = () => {
  const { chain } = useContext(Store);
  return useMemo(() => chain.coinCode, [chain]);
};

export default useCoinFormatter;
