import React, { useMemo } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Table from '../../../reusable/Table';
import { formatToken, formatTokenWithFixedFractional } from '../../../../utils';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';
import LayoutPagination from '../../../reusable/LayoutPagination';

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
  const { resp, isLoading, request } = useRequest(API.getValidatorDelegators, {
    limit,
    offset: 0,
    address,
  });

  const delegators = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return resp.items.map((delegator) => ({
      address: delegator.delegator,
      amount: formatTokenWithFixedFractional(delegator.amount, 2),
      since: moment.unix(delegator.since).format('DD-MM-YYYY'),
      delta: {
        value: formatToken(delegator.delta),
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
      <LayoutPagination
        isLoading={isLoading}
        request={request}
        address={address}
        resp={resp}
      />
    </>
  );
};

export default Delegators;
