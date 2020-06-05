import React from 'react';
import { Container } from '../../../components/styled/CustomBsGrid';
import SectionChart from '../../../components/network/stats/SectionChart';
import SectionNetwork from '../../../components/network/stats/SectionNetwork';
import SectionAccounts from '../../../components/network/stats/SectionAccounts';
import SectionBalances from '../../../components/network/stats/SectionBalances';
import SectionHealth from '../../../components/network/stats/SectionHealth';

const Stats = () => (
  <Container>
    <SectionChart />
    <SectionNetwork />
    <SectionAccounts />
    <SectionBalances />
    <SectionHealth />
  </Container>
);

export default Stats;
