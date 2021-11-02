import React, { useContext, useMemo } from 'react';
import moment from 'moment';
import Table from '../Table';
import Store from '../../store';
import useRequest from '../../hooks/useRequest';
import API from '../../api';
import LayoutPagination from '../LayoutPagination';

const cols = [
  {
    value: 'hash',
    label: 'Hash',
  },
  {
    value: 'status',
    label: 'Status',
  },
  {
    value: 'fee',
    label: 'Fee',
  },
  {
    value: 'height',
    label: 'Height',
  },
  {
    value: 'messages',
    label: 'Messages',
  },
  {
    value: 'created_at',
    label: 'Created at',
  },
];

const limit = 10;

const TransactionsTable = () => {
  const { chain } = useContext(Store);
  const { resp, isLoading, request } = useRequest(API.getTransactionList, {
    limit,
    offset: 0,
  });

  const transactions = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return resp.items.map((transaction) => ({
      hash: {
        link: `/${chain}/transaction/${transaction.hash}`,
        value: transaction.hash,
      },
      status: transaction.status ? 'success' : 'fail',
      fee: transaction.fee,
      height: transaction.height,
      messages: transaction.messages,
      created_at: moment.unix(transaction.created_at).format('DD-MM-YYYY LTS'),
    }));
  }, [chain, resp]);

  return (
    <>
      <Table cols={cols} rows={transactions} isLoading={isLoading} />
      <LayoutPagination isLoading={isLoading} request={request} resp={resp} />
    </>
  );
};

export default TransactionsTable;
