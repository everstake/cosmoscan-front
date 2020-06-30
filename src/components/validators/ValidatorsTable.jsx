import React, { useMemo } from 'react';
import Table from '../Table';
import useRequest from '../../hooks/useRequest';
import { formatNum } from '../../utils';
import API from '../../api';


const cols = [
  { value: 'title', label: 'Validator' },
  { value: 'power', label: 'Voting power (ATOM)' },
  { value: 'selfStake', label: 'Self-stake (ATOM)' },
  { value: 'fee', label: 'Fee (ATOM)' },
  { value: 'blocksProposed', label: 'Blocks proposed' },
  { value: 'delegators', label: 'Delegators' },
  { value: 'powerChange', label: 'Stake change (ATOM)' },
  { value: 'votes', label: 'Governance votes n/all' },
];


const ValidatorsTable = () => {
  const { resp, isLoading } = useRequest(API.getValidatorsList);
  const validators = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.sort((a, b) => +b.power - +a.power).map((validator) => ({
      title: validator.title,
      power: formatNum(+validator.power),
      selfStake: formatNum(+validator.self_stake),
      fee: formatNum(+validator.fee),
      blocksProposed: formatNum(validator.blocks_proposed),
      delegators: formatNum(validator.delegators),
      powerChange: formatNum(+validator.power_24_change),
      votes: formatNum(validator.governance_votes),
    }));
  }, [resp]);


  return (
    <Table
      isLoading={isLoading}
      cols={cols}
      rows={validators}
      maxHeight={635}
    />
  );
};

export default ValidatorsTable;
