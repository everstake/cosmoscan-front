import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import useRequest from '../../hooks/useRequest';
import { Container } from '../../components/styled/CustomBsGrid';
import SectionChart from '../../components/network/stats/SectionChart';
import DatePicker from '../../components/reusable/DatePicker';
import SectionNetwork from '../../components/network/stats/SectionNetwork';
import SectionAccounts from '../../components/network/stats/SectionAccounts';
import SectionBalances from '../../components/network/stats/SectionBalances';
import SectionHealth from '../../components/network/stats/SectionHealth';
import API from '../../api';

const DatePickerStyled = styled(DatePicker)`
  margin-bottom: 15px;
  max-width: 120px;
  margin-left: auto;
`;

const Stats = () => {
  const res = useRequest(API.getNetworkStats);
  const {
    // Network
    total_staking_balance: stakingBal,
    number_delegators: delegators,
    number_multi_delegators: multiDelegators,
    total_delegators: totalDelegators,
    network_size: networkSize,
    // Accounts
    total_accounts: accs,
    total_whale_accounts: whales,
    total_small_accounts: smallAccs,
    // Balances
    transfer_volume: txVol,
    fee_volume: feeVol,
    undelegation_volume: unbond,
    highest_fee: highestFee,
    // Health
    block_delay: blockDelay,
    total_jailers: jailers,
  } = res.resp ? res.resp : {};

  return (
    <Container>
      <Helmet>
        <title>Cosmos network statistics | Cosmoscan</title>
        <meta
          name="description"
          content="Overall data and stats of Cosmoshub."
        />
        <meta
          itemProp="description"
          content="Overall data and stats of Cosmoshub."
        />
        <meta
          property="og:description"
          content="Overall data and stats of Cosmoshub."
        />
        <meta
          name="twitter:description"
          content="Overall data and stats of Cosmoshub."
        />
      </Helmet>

      <SectionChart />
      <DatePickerStyled
        onChange={(date) => res.request({ to: moment(date).unix() })}
      />
      <SectionNetwork
        stats={{
          stakingBal,
          delegators,
          multiDelegators,
          totalDelegators,
          networkSize,
        }}
      />
      <SectionAccounts
        stats={{
          accs,
          whales,
          smallAccs,
        }}
      />
      <SectionBalances
        stats={{
          txVol,
          feeVol,
          unbond,
          highestFee,
        }}
      />
      <SectionHealth stats={{ blockDelay, jailers }} />
    </Container>
  );
};

export default Stats;
