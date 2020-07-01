import React, { useMemo } from 'react';
import Table from '../Table';
import useRequest from '../../hooks/useRequest';
import { formatNum, formatPercentValue } from '../../utils';
import API from '../../api';


const cols = [
  { value: 'num', label: '#' },
  { value: 'title', label: 'Validator' },
  { value: 'power', label: 'Voting power (ATOM)' },
  { value: 'selfStake', label: 'Self-stake (ATOM)' },
  { value: 'fee', label: 'Fee' },
  { value: 'blocksProposed', label: 'Blocks proposed' },
  { value: 'delegators', label: 'Delegators' },
  { value: 'powerChange', label: 'Stake change (ATOM)' },
  { value: 'votes', label: 'Governance votes n/all' },
];


const ValidatorsTable = () => {
  const { resp, isLoading } = useRequest(API.getValidatorsList);
  const validators = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.sort((a, b) => +b.power - +a.power).map((validator, index) => {
      const powerChangeSign = Math.sign(+validator.power_24_change);
      const powerChange = formatNum(+validator.power_24_change);

      return {
        num: index + 1,
        title: validator.title,
        power: formatNum(+validator.power),
        selfStake: formatNum(+validator.self_stake),
        fee: formatPercentValue(formatNum(validator.fee * 100)),
        blocksProposed: formatNum(validator.blocks_proposed),
        delegators: formatNum(validator.delegators),
        powerChange: {
        // eslint-disable-next-line no-nested-ternary
          color: powerChangeSign === -1
            ? 'danger'
            : powerChangeSign === +1
              ? 'success'
              : '',
          // eslint-disable-next-line no-nested-ternary
          value: powerChangeSign === -1
            ? powerChange
            : powerChangeSign === +1
              ? `+${powerChange}`
              : powerChange,

        },
        votes: formatNum(validator.governance_votes),
      };
    });
  }, [resp]);


  return (
    <Table
      isLoading={isLoading}
      cols={cols}
      rows={validators}
      maxHeight="auto"
    />
  );
};

export default ValidatorsTable;
