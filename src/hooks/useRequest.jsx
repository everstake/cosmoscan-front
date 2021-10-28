import { useState, useEffect } from 'react';
import { useChainsStateContext } from '../store/chainContext';

const useRequest = (reqFunc, opts) => {
  const { chain } = useChainsStateContext();
  const [resp, setResp] = useState(null);
  // TODO: May be needed to change the initial value
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  const request = async (options = opts) => {
    setIsLoading(true);
    try {
      const response = await reqFunc(options);
      setResp(response.data);
      setIsLoading(false);
    } catch (error) {
      // TODO: Implement the error handler
      console.error(error);
      setErr(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    request(opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  return {
    resp,
    err,
    isLoading,
    request,
  };
};

export default useRequest;
