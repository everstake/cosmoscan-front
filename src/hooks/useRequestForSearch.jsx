import { useContext, useEffect, useState } from 'react';
import Store from '../store';

const useRequestForSearch = (reqFunc, opts, state) => {
  const { chain } = useContext(Store);
  const [resp, setResp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const request = async (options = opts) => {
    setIsLoading(true);
    try {
      const response = await reqFunc(options);
      setResp(response.data);
      setIsLoading(false);
    } catch (error) {
      // TODO: Implement the error handler
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!state) {
      request();
    } else if (state) {
      setResp(state);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, state]);

  return {
    resp,
    isLoading,
    request,
    setIsLoading,
    setResp,
  };
};

export default useRequestForSearch;
