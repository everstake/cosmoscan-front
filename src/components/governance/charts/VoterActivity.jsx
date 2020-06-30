import React, { useContext, useEffect, useState } from 'react';
import PT from 'prop-types';
import { ThemeContext } from 'styled-components';
import ChartContainer from '../../../layouts/ChartContainer';
import BarChart from '../../chart-types/BarChart';
import { formatId, formatNum } from '../../../utils';
import SelectCustom from '../../SelectCustom';
import { voterTypes } from '../../../utils/constants';


const chartName = 'Voter activity';
const yAxisWidth = 40;
const yAxisTickCount = 10;
const barName = chartName;
const tooltipTxt = '# of addresses that cast a vote';
const tooltipLabelFormatter = (val) => `Proposal ${formatId(val)}`;
const filterVoterActivity = (votersType, proposal) => {
  switch (votersType) {
    case 'addresses':
      return proposal.voters - proposal.validators;
    case 'validators':
      return proposal.validators;
    default:
      return proposal.voters;
  }
};
const handleProposals = (proposals, voterType) => proposals.map((proposal) => ({
  name: proposal.name,
  dataPiece: filterVoterActivity(voterType, proposal),
}));


const VoterActivity = ({ isLoading, data }) => {
  const theme = useContext(ThemeContext);
  const [proposals, setProposals] = useState([]);
  const [currVoterType, setCurrVoterType] = useState(voterTypes[0]);

  useEffect(() => {
    setProposals(handleProposals(data, currVoterType));
  }, [data, currVoterType]);

  const handleChange = (opt) => {
    setCurrVoterType(opt.value);
  };

  return (
    <ChartContainer
      title={chartName}
      titleTooltip={tooltipTxt}
      select={(
        <SelectCustom
          opts={voterTypes}
          defaultOpt={voterTypes[0]}
          onChange={handleChange}
        />
      )}
      chart={(
        <BarChart
          isLoading={isLoading}
          data={proposals}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yAxisTickCount}
          yAxisLabelsFormatter={formatNum}
          xAxisTickFormatter={formatId}
          tooltipLabelFormatter={tooltipLabelFormatter}
          tooltipFormatter={formatNum}
          barColor={theme.navyBlue}
          barName={barName}
        />
      )}
    />
  );
};

VoterActivity.propTypes = {
  isLoading: PT.bool,
  data: PT.arrayOf(PT.object),
};
VoterActivity.defaultProps = {
  isLoading: false,
  data: [],
};

export default VoterActivity;
