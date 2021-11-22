import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../reusable/Table';
import Store from '../../store';
import LayoutPagination from '../reusable/LayoutPagination';
import Icon from '../styled/Icon';
import { formatToken } from '../../utils';

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

const TransactionsTable = ({ resp, isLoading, request }) => {
  const { chain } = useContext(Store);

  const transactions = useMemo(() => {
    if (!resp || !Object.keys(resp).length || resp.items === null) return [];

    return resp.items.map((transaction) => ({
      hash: {
        link: `/${chain.value}/transaction/${transaction.hash}`,
        value: transaction.hash,
      },
      status: {
        process() {
          return (
            <div>
              <Icon
                icon={transaction.status ? 'check' : 'times'}
                color={transaction.status ? 'success' : 'danger'}
                className="mr-1"
              />
              {transaction.status ? 'Success' : 'Fail'}
            </div>
          );
        },
      },
      fee: formatToken(transaction.fee),
      height: transaction.height,
      messages: transaction.messages,
      created_at: moment.unix(transaction.created_at).format('DD-MM-YYYY LTS'),
    }));
  }, [chain, resp]);

  return (
    <>
      <Table cols={cols} rows={transactions} isLoading={isLoading} />

      {!!resp.total && (
        <LayoutPagination isLoading={isLoading} request={request} resp={resp} />
      )}
    </>
  );
};

TransactionsTable.propTypes = {
  resp: PropTypes.objectOf(PropTypes.any),
  request: PropTypes.func,
  isLoading: PropTypes.bool,
};

TransactionsTable.defaultProps = {
  resp: {},
  request: () => null,
  isLoading: false,
};

export default TransactionsTable;
