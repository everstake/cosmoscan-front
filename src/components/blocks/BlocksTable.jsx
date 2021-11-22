import React, { useContext, useMemo } from 'react';
import moment from 'moment';
import Table from '../reusable/Table';
import Store from '../../store';
import useRequest from '../../hooks/useRequest';
import API from '../../api';
import LayoutPagination from '../reusable/LayoutPagination';

const cols = [
  {
    value: 'height',
    label: 'Block height',
  },
  {
    value: 'hash',
    label: 'Hash',
  },
  {
    value: 'proposer',
    label: 'Proposer',
  },
  {
    value: 'proposer_address',
    label: 'Proposer address',
  },
  {
    value: 'created_at',
    label: 'Created at',
  },
];

const limit = 10;

const BlocksTable = () => {
  const { chain } = useContext(Store);
  const { resp, isLoading, request } = useRequest(API.getBlockList, {
    limit,
    offset: 0,
  });

  const blocks = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return resp.items.map((block) => ({
      height: {
        value: block.height,
        link: `/${chain.value}/block/${block.height}`,
      },
      hash: block.hash,
      proposer: block.proposer,
      proposer_address: block.proposer_address,
      created_at: moment.unix(block.created_at).format('DD-MM-YYYY LTS'),
    }));
  }, [chain, resp]);

  return (
    <>
      <Table cols={cols} rows={blocks} isLoading={isLoading} maxHeight="100%" />
      <LayoutPagination
        request={request}
        isLoading={isLoading}
        resp={resp}
        limit={limit}
      />
    </>
  );
};

export default BlocksTable;
