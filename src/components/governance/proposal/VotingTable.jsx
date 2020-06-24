import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import Table from '../../Table';
import Spinner from '../../Spinner';
import useRequest from '../../../hooks/useRequest';
import { calculatePercent, formatNum, formatStatuses } from '../../../utils';
import API from '../../../api';


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
};
`;

const cols = [
  { value: 'voter', label: 'Voter' },
  { value: 'vote', label: 'Vote' },
  { value: 'timestamp', label: 'Date/time' },
  { value: 'hash', label: 'Hash' },
];

const VotingTable = ({ proposalId, className }) => {
  const [validatorType, setValidatorType] = useState('all');

  const res = useRequest(API.getVotes, proposalId);

  const isVotesEmpty = useMemo(() => Boolean(!res || !res.resp || !res.resp.length), [res]);

  const votesAll = useMemo(() => {
    if (isVotesEmpty) return [];

    return res.resp.sort((a, b) => b.created_at - a.created_at).map((vote) => ({
      voter: vote.title ? vote.title : vote.voter,
      vote: {
        value: formatStatuses(vote.option),
        // eslint-disable-next-line no-nested-ternary
        color: vote.option === 'Yes'
          ? 'success'
          // eslint-disable-next-line no-nested-ternary
          : vote.option === 'No'
            ? 'danger'
            : vote.option === 'NoWithVeto'
              ? 'burgundy'
              : 'blue',
      },
      timestamp: moment.unix(vote.created_at).format('DD-MM-YYYY'),
      hash: vote.tx_hash,
      isValidator: vote.is_validator,
    }));
  }, [res.resp, isVotesEmpty]);


  // const [offset, setOffset] = useState(0);
  const [currentVotesSet, setCurrentVotesSet] = useState(votesAll);
  useEffect(() => {
    const chooseVotes = (filterBy) => {
      switch (filterBy) {
        case 'validators':
          // setOffset(0);
          setCurrentVotesSet(votesAll.filter((vote) => vote.isValidator));
          break;
        case 'addresses':
          // setOffset(0);
          setCurrentVotesSet(votesAll.filter((vote) => !vote.isValidator));
          break;
        default:
          // setOffset(0);
          setCurrentVotesSet(votesAll);
          break;
      }
    };

    chooseVotes(validatorType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votesAll, validatorType]);

  // const [currVotes, setCurrVotes] = useState([]);
  // useEffect(() => {
  //   if (offset === 0) {
  //     setCurrVotes(currentVotesSet.slice(offset, 10));
  //     return;
  //   }
  //   setCurrVotes((prev) => [...prev, ...currentVotesSet.slice(offset, offset + 10)]);
  // }, [currentVotesSet, offset]);

  const votesCalcs = useMemo(() => {
    if (!votesAll || !votesAll.length) return 0;
    let all = 0;
    let yes = 0;
    let no = 0;
    let noVeto = 0;
    let abstain = 0;

    votesAll.forEach((vote) => {
      if (vote.vote.value) {
        all += 1;
      }
      if (vote.vote.value.toLowerCase() === 'yes') {
        yes += 1;
      }
      if (vote.vote.value.toLowerCase() === 'no') {
        no += 1;
      }
      if (vote.vote.value.toLowerCase() === 'no with veto') {
        noVeto += 1;
      }
      if (vote.vote.value.toLowerCase() === 'abstain') {
        abstain += 1;
      }
    });

    return {
      yes: `${formatNum(yes)}(${calculatePercent(all, yes)})`,
      no: `${formatNum(no)}(${calculatePercent(all, no)})`,
      noVeto: `${formatNum(noVeto)}(${calculatePercent(all, noVeto)})`,
      abstain: `${formatNum(abstain)}(${calculatePercent(all, abstain)})`,
    };
  }, [votesAll]);

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {res.isLoading
        ? <div className="text-center mt-5"><Spinner /></div>
        : !isVotesEmpty ? (
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
                    <Green>{votesCalcs.yes}</Green>
                  </StatsItem>
                  <StatsItem>
                    <TitleMinor>No: </TitleMinor>
                    <Red>{votesCalcs.no}</Red>
                  </StatsItem>
                  <StatsItem>
                    <TitleMinor>No with veto: </TitleMinor>
                    <Burgundy>{votesCalcs.noVeto}</Burgundy>
                  </StatsItem>
                  <StatsItem>
                    <TitleMinor>Abstain: </TitleMinor>
                    <Blue>{votesCalcs.abstain}</Blue>
                  </StatsItem>
                </StatsContainer>
              </Card.Body>
            </Card>

            <Table
              isLoading={res.isLoading}
              cols={cols}
              rows={currentVotesSet}
              // rows={currVotes}
              // callback={(el) => {
              //   return setOffset((prev) => {
              //     if (prev === 0) {
              //       el.scrollTop = 0;
              //     }
              //     return prev + 10;
              //   })
              // }}
            />
          </section>
        ) : <div />}
    </>
  );
};

VotingTable.propTypes = {
  className: PropTypes.string,
  proposalId: PropTypes.string.isRequired,
};
VotingTable.defaultProps = {
  className: '',
};

export default VotingTable;
