import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import ColMarginStandard from '../../components/styled/ColMarginStabdard';
import useRequest from '../../hooks/useRequest';
import API from '../../api';
import ProposalTurnout from '../../components/governance/charts/ProposalTurnout';
import VoterActivity from '../../components/governance/charts/VoterActivity';
// import VotingPowerToVeto from '../../components/governance/charts/VotingPowerToVeto';
import VetoedProposals from '../../components/governance/charts/VetoedProposals';

const Charts = () => {
  const { resp, isLoading } = useRequest(API.getProposalsCharts);
  const [turnouts, setTurnouts] = useState([]);
  const [voterActivity, setVoterActivity] = useState([]);
  const [vetoed, setVetoed] = useState([]);

  useEffect(() => {
    if (!resp || !resp.length) return;

    resp.reverse().forEach((prop) => {
      setTurnouts((prev) => [
        ...prev,
        { name: prop.proposal_id, dataPiece: prop.turnout },
      ]);
      if (prop.voters_total !== 0) {
        setVoterActivity((prev) => [
          ...prev,
          {
            name: prop.proposal_id,
            voters: prop.voters_total,
            validators: prop.validators_total,
          },
        ]);
      }
      if (Number(prop.no_with_veto_percent) !== 0) {
        setVetoed((prev) => [
          ...prev,
          {
            name: prop.proposal_id,
            dataPiece: +prop.no_with_veto_percent,
          },
        ]);
      }
    });
  }, [resp]);

  return (
    <Container>
      <Helmet>
        <title>Cosmos governance charts | Cosmoscan</title>
        <meta
          name="description"
          content="View aggregated governance activity data of Cosmoshub."
        />
        <meta
          itemProp="description"
          content="View aggregated governance activity data of Cosmoshub."
        />
        <meta
          property="og:description"
          content="View aggregated governance activity data of Cosmoshub."
        />
        <meta
          name="twitter:description"
          content="View aggregated governance activity data of Cosmoshub."
        />
      </Helmet>

      <Row xs={1} xl={2}>
        <ColMarginStandard>
          <ProposalTurnout isLoading={isLoading} data={turnouts} />
        </ColMarginStandard>
        <ColMarginStandard>
          <VoterActivity isLoading={isLoading} data={voterActivity} />
        </ColMarginStandard>
        {/* <ColMarginStandard> */}
        {/*  <VotingPowerToVeto /> */}
        {/* </ColMarginStandard> */}
        <ColMarginStandard>
          <VetoedProposals isLoading={isLoading} data={vetoed} />
        </ColMarginStandard>
      </Row>
    </Container>
  );
};

export default Charts;
