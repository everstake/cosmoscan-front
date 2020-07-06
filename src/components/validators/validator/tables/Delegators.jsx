import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Table from '../../../Table';
import { formatATOM } from '../../../../utils';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';


const cols = [
  { value: 'address', label: 'Address' },
  { value: 'amount', label: 'Amount' },
  { value: 'since', label: 'Delegating since' },
  { value: 'delta', label: '24h change' },
];
const defineDeltaColor = (delta) => {
  const sign = Math.sign(Number(delta));

  switch (sign) {
    case -1:
      return 'danger';
    case +1:
      return 'success';
    default:
      return '';
  }
};

const limit = 10;

const Delegators = () => {
  const { address } = useParams();
  const [offset, setOffset] = useState(0);
  const { resp, isLoading, request } = useRequest(
    API.getValidatorDelegators,
    { limit, offset, address },
  );
  const prev = () => {
    if (offset > 0) {
      setOffset((prevState) => prevState - limit);
      request({ limit, offset: offset - limit, address });
    }
  };
  const next = () => {
    setOffset((prevState) => prevState + limit);
    request({ limit, offset: offset + limit, address });
  };
  const delegators = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return resp.items.map((delegator) => ({
      address: delegator.delegator,
      amount: formatATOM(delegator.amount),
      since: moment.unix(delegator.since).format('DD-MM-YYYY'),
      delta: {
        value: formatATOM(delegator.delta),
        color: defineDeltaColor(delegator.delta),
      },
    }));
  }, [resp]);

  return (
    <>
      <Table
        isLoading={isLoading}
        isHeightFixed
        cols={cols}
        rows={delegators}
      />
      <Pagination className="justify-content-end mt-3 mr-3">
        <Pagination.Prev
          onClick={prev}
          disabled={offset === 0 || isLoading}
        />
        <Pagination.Next
          onClick={next}
          disabled={(!delegators || !delegators.length) || isLoading}
        />
      </Pagination>
    </>
  );
};

export default Delegators;
