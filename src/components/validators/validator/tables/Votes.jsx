import React, { useMemo } from 'react';
import PT from 'prop-types';
import moment from 'moment';
import Table from '../../../reusable/Table';
import { formatId, formatStatuses } from '../../../../utils';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';

const cols = [
  { value: 'proposalId', label: 'Proposal id' },
  { value: 'vote', label: 'Vote' },
  { value: 'timestamp', label: 'Date/time' },
];

const Votes = ({ accAddress }) => {
  const { resp, isLoading } = useRequest(API.getVotes, { voters: accAddress });
  const votes = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp
      .sort((a, b) => b.proposal_id - a.proposal_id)
      .map((vote) => ({
        proposalId: {
          value: formatId(vote.proposal_id),
          link: `/proposal/${vote.proposal_id}`,
        },
        vote: {
          value: formatStatuses(vote.option),
          // eslint-disable-next-line no-nested-ternary
          color:
            // eslint-disable-next-line no-nested-ternary
            vote.option === 'Yes'
              ? 'success'
              : // eslint-disable-next-line no-nested-ternary
              vote.option === 'No'
              ? 'danger'
              : vote.option === 'NoWithVeto'
              ? 'burgundy'
              : 'blue',
        },
        timestamp: moment.unix(vote.created_at).format('DD-MM-YYYY'),
      }));
  }, [resp]);

  return <Table isLoading={isLoading} cols={cols} rows={votes} />;
};

Votes.propTypes = {
  accAddress: PT.string.isRequired,
};

export default Votes;
