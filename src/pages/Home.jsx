import React from 'react';
import Helmet from 'react-helmet';
import { Container } from '../components/styled/CustomBsGrid';
import MainStats from '../components/home/MainStats';
import MainCharts from '../components/home/MainCharts';

const Home = () => (
  <Container>
    <Helmet>
      <title>Home | Cosmoscan</title>
      <meta
        name="description"
        content="Cosmoscan is the first data and statistics explorer for the Cosmos network. It provides information on the overall network operations, governance details, validators and much more."
      />
      <meta
        itemProp="description"
        content="Cosmoscan is the first data and statistics explorer for the Cosmos network. It provides information on the overall network operations, governance details, validators and much more."
      />
      <meta
        property="og:description"
        content="Cosmoscan is the first data and statistics explorer for the Cosmos network. It provides information on the overall network operations, governance details, validators and much more."
      />
      <meta
        name="twitter:description"
        content="Cosmoscan is the first data and statistics explorer for the Cosmos network. It provides information on the overall network operations, governance details, validators and much more."
      />
    </Helmet>

    <MainStats />

    <MainCharts />
  </Container>
);

export default Home;
