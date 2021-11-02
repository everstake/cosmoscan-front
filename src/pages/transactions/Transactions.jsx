import React from 'react';
import { Container } from '../../components/styled/CustomBsGrid';
import TransactionsTable from '../../components/transactions/TransactionsTable';

const Transactions = () => {
  return (
    <Container>
      <TransactionsTable />
    </Container>
  );
};

export default Transactions;
