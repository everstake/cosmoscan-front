import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitleMinor from '../../styled/TitleMinor';

const TopStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  @media(max-width: ${({ theme: { smDown } }) => smDown}) {
    flex-direction: column;
  }
`;

const Status = styled.div`
  margin-bottom: 20px;
`;

const StatusValue = styled.span`
  color: ${({
    status, theme: { danger, success },
  }) => (status === 'Rejected' ? danger : success)};
  font-weight: 700;
`;

const VotingVal = styled.span`
  font-weight: 700;
  color: ${({ theme: { blue } }) => blue};
`;


const TopStatus = ({ status, votingEnds }) => (
  <TopStatusContainer>
    <Status>
      <TitleMinor
        as="span"
        className="mb-0 mr-1"
      >
        Voting ends in:
      </TitleMinor>
      <VotingVal>
        { votingEnds }
      </VotingVal>
    </Status>
    <Status>
      <TitleMinor
        as="span"
        className="mb-0 mr-1"
      >
        Status:
      </TitleMinor>
      <StatusValue status={status}>
        { status }
      </StatusValue>
    </Status>
  </TopStatusContainer>
);

TopStatus.propTypes = {
  status: PropTypes.string,
  votingEnds: PropTypes.string,
};
TopStatus.defaultProps = {
  status: '-----',
  votingEnds: '-----',
};

export default TopStatus;
