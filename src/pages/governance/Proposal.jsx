import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import TopStatus from '../../components/governance/proposal/TopStatus';
import VotingChart from '../../components/governance/proposal/VotingChart';
import Stats from '../../components/governance/proposal/Stats';
import Description from '../../components/governance/proposal/Description';
import VotingTable from '../../components/governance/proposal/VotingTable';
import useRequest from '../../hooks/useRequest';
import { formatPercentValue } from '../../utils';
import API from '../../api';

const DescriptionStyled = styled(Description)`
  margin-top: 10px;
`;

const VotingTableStyled = styled(VotingTable)`
  margin-top: ${({ theme: { marginSectionsStandard } }) =>
    marginSectionsStandard};
`;

const Proposal = () => {
  const { id: proposalIdFromRoute } = useParams();
  const res = useRequest(API.getProposals, { id: proposalIdFromRoute });
  const isData = useMemo(
    () => Boolean(res && res.resp && res.resp.length),
    [res],
  );

  const {
    votes_yes: yes,
    votes_no: no,
    votes_no_with_veto: veto,
    votes_abstain: abstain,
    voting_end_time: votingEnd,
    voting_start_time: votingStart,
    id,
    title,
    proposer,
    proposer_address: proposerAddress,
    tx_hash: txHash,
    submit_time: submitTime,
    deposit_end_time: depositEnd,
    type,
    turnout,
    status,
    description,
  } = useMemo(() => {
    if (!isData) return {};

    return res.resp[0];
  }, [res, isData]);

  const totalATOMVoted = useMemo(() => {
    if (!isData) return 0;

    return Number(yes) + Number(no) + Number(veto) + Number(abstain);
  }, [yes, no, veto, abstain, isData]);

  // TODO: Refactor. Duplicated logic. The same can be found in the CardProposal.jsx
  const chartData = useMemo(() => {
    if (!isData) return [];

    return [
      { value: (Number(yes) * 100) / totalATOMVoted, title: 'Yes' },
      { value: (Number(no) * 100) / totalATOMVoted, title: 'No' },
      { value: (Number(veto) * 100) / totalATOMVoted, title: 'No with veto' },
      { value: (Number(abstain) * 100) / totalATOMVoted, title: 'Abstain' },
    ];
  }, [yes, no, veto, abstain, totalATOMVoted, isData]);

  const votingEnds = useMemo(() => {
    if (!isData) return '-----';

    const end = moment.unix(votingEnd);
    const now = moment();
    const diff = end.diff(now, 'days');

    // eslint-disable-next-line no-nested-ternary
    return end < 0 ? '----' : end < now ? 'Voting has ended' : `${diff} days`;
  }, [isData, votingEnd]);

  const stats = useMemo(() => {
    if (!isData) return {};

    return {
      id,
      title,
      proposer,
      proposerAddress,
      hash: txHash,
      type,
      submitted: moment.unix(submitTime).format('DD-MM-YYYY'),
      votingStart:
        votingStart > 0 ? moment.unix(votingStart).format('DD-MM-YYYY') : '',
      votingEnd:
        votingEnd > 0 ? moment.unix(votingEnd).format('DD-MM-YYYY') : '',
      depositEnd: moment.unix(depositEnd).format('DD-MM-YYYY'),
      turnout: formatPercentValue(turnout),
      totalATOMVoted,
    };
  }, [
    isData,
    id,
    title,
    proposer,
    proposerAddress,
    txHash,
    type,
    submitTime,
    votingStart,
    votingEnd,
    depositEnd,
    turnout,
    totalATOMVoted,
  ]);

  return (
    <Container>
      <Helmet>
        <title>Cosmos governance proposal | Cosmoscan</title>
        <meta
          name="description"
          content="Stats of the individual Cosmoshub governance proposal."
        />
        <meta
          itemProp="description"
          content="Stats of the individual Cosmoshub governance proposal."
        />
        <meta
          property="og:description"
          content="Stats of the individual Cosmoshub governance proposal."
        />
        <meta
          name="twitter:description"
          content="Stats of the individual Cosmoshub governance proposal."
        />
      </Helmet>

      <section>
        <TopStatus status={status} votingEnds={votingEnds} />
        <Row>
          <Col xl={6}>
            <VotingChart isLoading={res.isLoading} data={chartData} />
          </Col>
          <Col xl={6}>
            <Stats stats={stats} />
          </Col>
        </Row>
        <DescriptionStyled title={title} desc={description} />
      </section>
      <VotingTableStyled proposalId={proposalIdFromRoute} />
    </Container>
  );
};

export default Proposal;
