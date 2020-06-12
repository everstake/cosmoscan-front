import React from 'react';
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
  color: ${({ theme: { blue } }) => blue};
  font-weight: 600;
`;


const TopStatus = () => (
  <TopStatusContainer>
    <Status>
      <TitleMinor
        as="span"
        className="mb-0 mr-1"
      >
        Voting ends in:
      </TitleMinor>
      <span>
        23 days
      </span>
    </Status>
    <Status>
      <TitleMinor
        as="span"
        className="mb-0 mr-1"
      >
        Status:
      </TitleMinor>
      <StatusValue>
        active
      </StatusValue>
    </Status>
  </TopStatusContainer>
);

export default TopStatus;
