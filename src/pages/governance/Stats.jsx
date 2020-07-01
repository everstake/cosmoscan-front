import React from 'react';
import ColStyled from '../../components/styled/ColStyled';
import useRequest from '../../hooks/useRequest';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import CardProposal from '../../components/governance/CardProposal';
import Spinner from '../../components/Spinner';
import API from '../../api';

const Stats = () => {
  const { isLoading, resp } = useRequest(API.getProposals);

  return (
    <Container>
      <Row>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading
          ? (
            <div className="text-center w-100">
              <Spinner />
            </div>
          )
          : resp
            ? resp.map((proposal, id) => (
              <ColStyled
                key={proposal.id}
                xl={6}
              >
                <CardProposal proposal={proposal} />
              </ColStyled>
            ))
            : <div className="text-center w-100">No data</div>}
      </Row>
    </Container>
  );
};

export default Stats;
