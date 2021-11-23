import React, { useContext, useMemo } from 'react';
import Table from '../reusable/Table';
import useRequest from '../../hooks/useRequest';
import {
  formatNum,
  formatPercentValue,
  roundToPrecision,
  formatPercentDec2,
} from '../../utils';
import API from '../../api';
import Store from '../../store';
import useCoinFormatter from '../../hooks/useCoinFormatter';

const ValidatorsTable = () => {
  const { resp, isLoading } = useRequest(API.getValidatorsList);
  const { chain } = useContext(Store);
  const coin = useCoinFormatter();

  const cols = [
    { value: 'num', label: '#' },
    { value: 'title', label: 'Validator' },
    { value: 'power', label: `Voting power (${coin})` },
    { value: 'percentPower', label: 'Voting power (%)' },
    { value: 'selfStake', label: `Self-stake (${coin})` },
    { value: 'fee', label: 'Fee' },
    { value: 'blocksProposed', label: 'Blocks proposed' },
    { value: 'delegators', label: 'Delegators' },
    { value: 'powerChange', label: `Stake change (${coin})` },
    { value: 'votes', label: 'Governance votes' },
  ];

  const validators = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp
      .sort((a, b) => +b.power - +a.power)
      .map((validator, index) => {
        const powerChangeSign = Math.sign(+validator.power_24_change);
        const powerChange = formatNum(+validator.power_24_change);

        return {
          num: index + 1,
          // title: <a href={validator.title}>{ validator.title }</a>,
          title: {
            value: validator.title,
            link: `/${chain.value}/validator/${validator.operator_address}`,
          },
          power: formatNum(roundToPrecision(+validator.power, 0)),
          percentPower: formatPercentDec2(+validator.percent_power),
          selfStake: formatNum(roundToPrecision(+validator.self_stake, 0)),
          fee: formatPercentValue(formatNum(validator.fee * 100)),
          blocksProposed: formatNum(validator.blocks_proposed),
          delegators: formatNum(validator.delegators),
          powerChange: {
            color:
              // eslint-disable-next-line no-nested-ternary
              powerChangeSign === -1
                ? 'danger'
                : powerChangeSign === +1
                ? 'success'
                : '',
            value:
              // eslint-disable-next-line no-nested-ternary
              powerChangeSign === -1
                ? powerChange
                : powerChangeSign === +1
                ? `+${powerChange}`
                : powerChange,
          },
          votes: formatNum(validator.governance_votes),
        };
      });
  }, [chain, resp]);

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
