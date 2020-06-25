import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import useRequest from '../../hooks/useRequest';
import API from '../../api';
import ProposalTurnout from '../../components/governance/charts/ProposalTurnout';
import VoterActivity from '../../components/governance/charts/VoterActivity';
import VotingPowerToVeto from '../../components/governance/charts/VotingPowerToVeto';
import VetoedProposals from '../../components/governance/charts/VetoedProposals';

const ColStyled = styled(Col)`
  margin-bottom: ${({ theme: { marginSectionsStandard } }) => marginSectionsStandard};
`;

const Charts = () => {
  const { resp, isLoading } = useRequest(API.getProposalsCharts);

  const turnouts = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.map((proposal) => ({
      name: proposal.proposal_id,
      dataPiece: proposal.turnout,
    })).reverse();
  }, [resp]);

  const voterActivity = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.filter((proposal) => (proposal.voters_total !== 0)).map((proposal) => ({
      name: proposal.proposal_id,
      voters: proposal.voters_total,
      validators: proposal.validators_total,
    })).reverse();
  }, [resp]);

  const vetoed = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.filter((proposal) => (Number(proposal.no_with_veto_percent) !== 0)).map((proposal) => ({
      name: proposal.proposal_id,
      dataPiece: +proposal.no_with_veto_percent,
    })).reverse();
  }, [resp]);

  return (
    <Container>
      <Row xs={1} xl={2}>
        <ColStyled>
          <ProposalTurnout
            isLoading={isLoading}
            data={turnouts}
          />
        </ColStyled>
        <ColStyled>
          <VoterActivity
            isLoading={isLoading}
            data={voterActivity}
          />
        </ColStyled>
        <ColStyled>
          <VotingPowerToVeto />
        </ColStyled>
        <ColStyled>
          <VetoedProposals
            isLoading={isLoading}
            data={vetoed}
          />
        </ColStyled>
      </Row>
    </Container>
  );
};

export default Charts;
