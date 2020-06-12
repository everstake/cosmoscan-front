import React from 'react';
import useRequest from '../../../hooks/useRequest';
import { Container } from '../../../components/styled/CustomBsGrid';
import SectionChart from '../../../components/network/stats/SectionChart';
import SectionNetwork from '../../../components/network/stats/SectionNetwork';
// import SectionAccounts from '../../../components/network/stats/SectionAccounts';
import SectionBalances from '../../../components/network/stats/SectionBalances';
import SectionHealth from '../../../components/network/stats/SectionHealth';
import API from '../../../api';

const Stats = () => {
  const res = useRequest(API.getNetworkStats);
  const {
    number_delegators: delegators,
    number_multi_delegators: multiDelegators,
    transfer_volume: txVol,
    fee_volume: feeVol,
    undelegation_volume: unbond,
    highest_fee: highestFee,
    block_delay: blockDelay,
  } = res.resp ? res.resp : {};

  return (
    <Container>
      <SectionChart />
      <SectionNetwork stats={{ delegators, multiDelegators }} />
      {/* <SectionAccounts /> */}
      <SectionBalances stats={{
        txVol,
        feeVol,
        unbond,
        highestFee,
      }}
      />
      <SectionHealth stats={{ blockDelay }} />
    </Container>
  );
};

export default Stats;
