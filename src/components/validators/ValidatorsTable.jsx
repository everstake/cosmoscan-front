import React, { useMemo } from 'react';
import Table from '../Table';
import useRequest from '../../hooks/useRequest';
import { formatATOM, formatNum } from '../../utils';
import API from '../../api';


const cols = [
  { value: 'title', label: 'Validator' },
  { value: 'power', label: 'Voting power' },
  { value: 'selfStake', label: 'Self-stake' },
  { value: 'fee', label: 'Fee' },
  { value: 'blocksProposed', label: 'Blocks proposed' },
  { value: 'delegators', label: 'Delegators' },
  { value: 'powerChange', label: 'Stake change' },
  { value: 'votes', label: 'Governance votes n/all' },
];


const ValidatorsTable = () => {
  const { resp, isLoading } = useRequest(API.getValidatorsList);
  const validators = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.map((validator) => ({
      title: validator.title,
      power: formatATOM(+validator.power),
      selfStake: formatATOM(+validator.self_stake),
      fee: formatATOM(validator.fee),
      blocksProposed: formatNum(validator.blocks_proposed),
      delegators: formatNum(validator.delegators),
      powerChange: formatATOM(validator.power_24_change),
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
