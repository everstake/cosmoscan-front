import React, { useContext, useEffect, useState } from 'react';
import PT from 'prop-types';
import { ThemeContext } from 'styled-components';
import ChartContainer from '../../../layouts/ChartContainer';
import BarChart from '../../chart-types/BarChart';
import { formatId, formatPercentValue } from '../../../utils';
import SelectCustom from '../../SelectCustom';
import { numsOfProposals } from '../../../utils/constants';


const chartName = 'Proposal turnout';
const yAxisWidth = 40;
const yAxisTickCount = 10;
const barName = chartName;
const tooltipTxt = 'Total % of ATOM participating in voting';
const tooltipLabelFormatter = (val) => `Proposal ${formatId(val)}`;


const ProposalTurnout = ({ isLoading, data }) => {
  const theme = useContext(ThemeContext);
  const [proposals, setProposals] = useState(data);
  useEffect(() => {
    setProposals(data);
  }, [data]);
  const handleChange = (opt) => {
    switch (opt.value) {
      case 3:
        setProposals(data.slice(-3));
        break;
      case 10:
        setProposals(data.slice(-10));
        break;
      default:
        setProposals(data);
        break;
    }
  };

  return (
    <ChartContainer
      title={chartName}
      titleTooltip={tooltipTxt}
      select={(
        <SelectCustom
          opts={numsOfProposals}
          defaultOpt={numsOfProposals[2]}
          onChange={handleChange}
        />
          )}
      chart={(
        <BarChart
          isLoading={isLoading}
          data={proposals}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yAxisTickCount}
          yAxisLabelsFormatter={formatPercentValue}
          xAxisTickFormatter={formatId}
          tooltipLabelFormatter={tooltipLabelFormatter}
          tooltipFormatter={formatPercentValue}
          barColor={theme.blue}
          barName={barName}
        />
          )}
    />
  );
};

ProposalTurnout.propTypes = {
  isLoading: PT.bool,
  data: PT.arrayOf(PT.object),
};
ProposalTurnout.defaultProps = {
  isLoading: false,
  data: [],
};

export default ProposalTurnout;
