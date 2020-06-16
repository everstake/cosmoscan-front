import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import Table from '../../Table';


const FlexContainer = css`
  display: flex;
  margin: 0 -5px;
   div {
    padding: 0 5px;
  }
`;

const BtnsContainer = styled.div`
  ${FlexContainer}
  
  div {
    flex: 1 0 33.333%;
    margin-bottom: 10px;
  }
  
  @media(max-width: ${({ theme: { mdDown } }) => mdDown}) {
    flex-direction: column;
  }
`;

const StatsContainer = styled.div`
  ${FlexContainer};
  flex-wrap: wrap;
`;

const StatsItem = styled.div`
  flex: 1 0 25%;
  text-align: center;
  
  ${({ theme: { lgDown, smDown } }) => css`
    @media(max-width: ${lgDown}) {
      flex: 1 0 50%;
      
      &:first-child, &:nth-child(2) {
        margin-bottom: 10px;
      }
    }
  
    @media(max-width: ${smDown}) {
      flex: 1 0 100%;
      margin-bottom: 10px;
    }
  `}
`;


const Green = styled.div`
  color: ${({ theme: { success } }) => success}
`;
const Burgundy = styled.div`
  color: ${({ theme: { burgundy } }) => burgundy}
`;
const Red = styled.div`
  color: ${({ theme: { danger } }) => danger}
`;
const Blue = styled.div`
  color: ${({ theme: { blue } }) => blue}
`;

const Btn = styled(Button)`
 ${({
    active, theme: {
      fs14, blue, blue2, grey,
    },
  }) => css`
     font-size: ${fs14};
     background-color: ${active ? blue : grey};
     border-color: ${active ? blue : grey};
     
     &:hover, &:focus {
       background-color: ${blue2};
       border-color: ${blue2};
     }
     &:not(:disabled):not(.disabled).active,
     &:not(:disabled):not(.disabled):active {
       background-color: ${blue};
       border-color: ${blue};
     }
    `
}2
`;

const cols = [
  { value: 'voter', label: 'Voter' },
  { value: 'vote', label: 'Vote' },
  { value: 'amount', label: 'Amount' },
  { value: 'timestamp', label: 'Date/time' },
  { value: 'hash', label: 'Hash' },

  // 'voter',
  // 'vote',
  // 'amount',
  // 'timestamp',
  // 'hash',
];
const rows = [
  {
    vote: 'Yes', amount: 200, voter: 'Otto', timestamp: moment().format('YYYY-MM-DD'), hash: 'hg2123333144fcs',
  },
  {
    amount: 300, voter: 'Max', vote: 'No', timestamp: moment().format('YYYY-MM-DD'), hash: 'hg2123333144fcs',
  },
];

const VotingTable = ({ className }) => {
  const [validatorType, setValidatorType] = useState('all');

  return (
    <section className={className}>
      <BtnsContainer>
        <div>
          <Btn
            block
            onClick={() => setValidatorType('all')}
            active={validatorType === 'all'}
          >
            All
          </Btn>
        </div>
        <div>
          <Btn
            block
            onClick={() => setValidatorType('validators')}
            active={validatorType === 'validators'}
          >
            Validators
          </Btn>
        </div>
        <div>
          <Btn
            block
            onClick={() => setValidatorType('addresses')}
            active={validatorType === 'addresses'}
          >
            Individual addresses
          </Btn>
        </div>
      </BtnsContainer>

      <Card style={{ marginBottom: '10px' }}>
        <Card.Body>
          <StatsContainer>
            <StatsItem>
              <TitleMinor>Yes: </TitleMinor>
              <Green>50%(2,000 ATOM)</Green>
            </StatsItem>
            <StatsItem>
              <TitleMinor>No: </TitleMinor>
              <Burgundy>50%(2,000 ATOM)</Burgundy>
            </StatsItem>
            <StatsItem>
              <TitleMinor>No with veto: </TitleMinor>
              <Red>50%(2,000 ATOM)</Red>
            </StatsItem>
            <StatsItem>
              <TitleMinor>Abstain: </TitleMinor>
              <Blue>50%(2,000 ATOM)</Blue>
            </StatsItem>
          </StatsContainer>
        </Card.Body>
      </Card>

      <Table
        cols={cols}
        rows={rows}
      />
    </section>
  );
};

VotingTable.propTypes = {
  className: PropTypes.string,
};
VotingTable.defaultProps = {
  className: '',
};

export default VotingTable;
