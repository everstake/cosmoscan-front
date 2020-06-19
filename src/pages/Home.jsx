import React from 'react';
import { Container } from '../components/styled/CustomBsGrid';
import MainStats from '../components/home/MainStats';
import MainCharts from '../components/home/MainCharts';

const Home = () => (
  <Container>
    <MainStats />
    <MainCharts />
  </Container>
);

export default Home;
