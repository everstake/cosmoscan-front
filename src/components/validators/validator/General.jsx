import React from 'react';
import PT from 'prop-types';
import Card from '../../styled/Card';
import StatsItem from '../../styled/StatsItem';
import TitleMinor from '../../styled/TitleMinor';
import BreakTxt from '../../styled/BreakTxt';
import {
  noString,
  formatPercentValue,
  removeProtocol,
  formatNum,
} from '../../../utils';

const General = ({
  info: {
    title,
    acc_address: accAddress,
    operator_address: valAddress,
    cons_address: consAddress,
    percent_power: votingPower,
    fee,
    website,
  },
}) => (
  <Card modifiers="height100">
    <Card.Body>
      <StatsItem>
        <TitleMinor as="span">Name: </TitleMinor>
        <BreakTxt className="ml-1">{noString(title)}</BreakTxt>
      </StatsItem>

      <StatsItem>
        <TitleMinor as="span">Account address: </TitleMinor>
        <BreakTxt className="ml-1">{noString(accAddress)}</BreakTxt>
      </StatsItem>

      <StatsItem>
        <TitleMinor as="span">Validator address: </TitleMinor>
        <BreakTxt className="ml-1">{noString(valAddress)}</BreakTxt>
      </StatsItem>

      <StatsItem>
        <TitleMinor as="span">Consensus address: </TitleMinor>
        <BreakTxt className="ml-1">{noString(consAddress)}</BreakTxt>
      </StatsItem>

      <StatsItem>
        <TitleMinor as="span">
          Voting power in % of overall network:{' '}
        </TitleMinor>
        <BreakTxt className="ml-1">
          {noString(formatPercentValue(votingPower))}
        </BreakTxt>
      </StatsItem>

      <StatsItem>
        <TitleMinor as="span">Fee: </TitleMinor>
        <BreakTxt className="ml-1">
          {noString(formatPercentValue(formatNum(fee * 100)))}
        </BreakTxt>
      </StatsItem>

      <StatsItem>
        <TitleMinor as="span">Website: </TitleMinor>
        <BreakTxt className="ml-1">
          <a
            href={`//${website ? removeProtocol(website) : '#'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {noString(website)}
          </a>
        </BreakTxt>
      </StatsItem>
    </Card.Body>
  </Card>
);

General.propTypes = {
  info: PT.objectOf(PT.oneOfType([PT.string, PT.number])),
};
General.defaultProps = {
  info: {},
};

export default General;
