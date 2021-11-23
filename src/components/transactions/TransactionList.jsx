import React, { useMemo } from 'react';
import { Container } from '../styled/CustomBsGrid';
import TransactionsTable from './TransactionsTable';
import useRequest from '../../hooks/useRequest';
import API from '../../api';

const limit = 10;

const TransactionList = () => {
  const { resp, isLoading, request } = useRequest(API.getTransactionList, {
    limit,
    offset: 0,
  });

  const trx = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return {};

    return resp;
  }, [resp]);

  return (
    <Container>
      <TransactionsTable resp={trx} isLoading={isLoading} request={request} />
    </Container>
  );
};

export default TransactionList;
