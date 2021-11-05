import React from 'react';
import { Container } from '../../components/styled/CustomBsGrid';
import TransactionList from '../../components/transactions/TransactionList';

const Transactions = () => {
  return (
    <Container>
      <TransactionList />
    </Container>
  );
};

export default Transactions;
