import React from 'react';
import styled from 'styled-components';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';

const TopStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  @media(max-width: ${({ theme: { smDown } }) => smDown}) {
    flex-direction: column;
  }
`;

const CardStatus = styled(Card)`
  margin-bottom: 10px;
`;

const StatusValue = styled.span`
  color: ${({ theme: { blue } }) => blue};
  font-weight: 600;
`;


const TopStatus = () => (
  <TopStatusContainer>
    <CardStatus>
      <CardStatus.Body>
        <TitleMinor
          as="span"
          className="mb-0 mr-1"
        >
          Voting ends in:
        </TitleMinor>
        <span>
          23 days
        </span>
      </CardStatus.Body>
    </CardStatus>
    <CardStatus>
      <CardStatus.Body>
        <TitleMinor
          as="span"
          className="mb-0 mr-1"
        >
          Status:
        </TitleMinor>
        <StatusValue>
          active
        </StatusValue>
      </CardStatus.Body>
    </CardStatus>
  </TopStatusContainer>
);

export default TopStatus;
