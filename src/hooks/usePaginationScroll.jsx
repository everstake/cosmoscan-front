import { useCallback, useEffect, useState } from 'react';

const limit = 50;

const UsePaginationScroll = (reqFunc, opt) => {
  const [resp, setData] = useState([]);
  const [isOffset, setOffset] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [notData, setNotData] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const handleScroll = useCallback(
    (e) => {
      const el = e.target;

      if (el.scrollHeight - (el.scrollTop + el.clientHeight) < 50 && notData) {
        setFetching(true);
      }
    },
    [notData],
  );

  useEffect(() => {
    const request = async () => {
      if (fetching) {
        try {
          if (isOffset === 0) {
            setLoading(true);
          }
          const res = await reqFunc({
            proposal_id: opt,
            limit,
            offset: isOffset,
          });

          if (res.data) {
            setData([...resp, ...res.data]);
            setOffset((prevState) => prevState + limit);
          } else {
            setNotData(false);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setFetching(false);
          setLoading(false);
        }
      }
    };

    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  return {
    resp,
    handleScroll,
    isLoading,
    fetching,
  };
};

export default UsePaginationScroll;
