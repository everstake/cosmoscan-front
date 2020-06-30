import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import ChartContainer from '../../../layouts/ChartContainer';
import AreaChart from '../../chart-types/AreaChart';
import { periodOpts } from '../../../utils/constants';
import { formatDate, formatDateWithTime, formatNum } from '../../../utils';
import API from '../../../api';


const chartName = 'Voting power to veto';
const yAxisWidth = 40;
const yTickCount = 10;
const areaName = chartName;
const tooltipTxt = '# of top validators who hold 33.4% of total voting power and can veto a proposal';
const defaultPeriod = periodOpts[1];


const VotingPowerToVeto = () => {
  const theme = useContext(ThemeContext);
  const color = theme.violet;
  const res = useRequest(API.getValidatorsVotingPower, defaultPeriod.value);
  const votingPowerComp = useChartFormatter(res.resp);

  return (
    <ChartContainer
      title={chartName}
      titleTooltip={tooltipTxt}
      chart={(
        <AreaChart
          areaName={areaName}
          isLoading={res.isLoading}
          data={votingPowerComp}
          yAxisLabelsFormatter={formatNum}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatNum}
          tooltipLabelFormatter={formatDateWithTime}
          color={color}
        />
      )}
    />
  );
};

export default VotingPowerToVeto;
