import React, { useContext, useMemo } from 'react';
import moment from 'moment';
import { NavLink, useParams } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import API from '../../api';
import Store from '../../store';
import TemplateCard from '../../components/reusable/TemplateCard';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import { Container } from '../../components/styled/CustomBsGrid';

const BlockDetails = () => {
  const { chain } = useContext(Store);
  const { id } = useParams();
  const { resp, isLoading } = useRequest(API.getBlockDetails, id);

  const blockDetails = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return resp;
  }, [resp]);

  const txs = useMemo(() => {
    if (!resp || !resp.txs) return {};

    return { items: resp.txs };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resp]);

  const items = useMemo(() => {
    return [
      {
        key: 'chain_id',
        label: 'Chain Id',
        value: blockDetails.chain_id,
      },
      { key: 'height', label: 'Height', value: blockDetails.height },
      {
        key: 'hash',
        label: 'Hash',
        process() {
          return <div>{blockDetails.hash}</div>;
        },
      },
      {
        key: 'created_at',
        label: 'Block Time',
        value: moment.unix(blockDetails.created_at).format('DD-MM-YYYY LTS'),
      },
      {
        key: 'total_txs',
        label: 'Number of Tx',
        value: blockDetails.total_txs,
      },
      {
        key: 'proposer',
        label: 'Proposer',
        process() {
          return (
            <NavLink
              exact
              to={`/${chain.value}/validator/${blockDetails.proposer_address}`}
            >
              {blockDetails.proposer}
            </NavLink>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockDetails]);

  return (
    <Container>
      <TemplateCard
        title={`Block Details #${blockDetails.height}`}
        items={items}
        isLoading={isLoading}
      />

      <div className="mt-4">
        <TransactionsTable resp={txs} isLoading={isLoading} />
      </div>
    </Container>
  );
};

export default BlockDetails;
