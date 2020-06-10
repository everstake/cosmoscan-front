import { useState, useEffect } from 'react';

const useRequest = (reqFunc, opts) => {
  const [resp, setResp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  }, []);

  return {
    resp, err, isLoading, request,
  };
};

export default useRequest;
