import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useRequest from '../../../hooks/useRequest';
import useChartFormatter from '../../../hooks/useChartFormatter';
import ChartContainer from '../../../layouts/ChartContainer';
import SelectPeriod from '../../SelectPeriod';
import AreaChart from '../../chart-types/AreaChart';
import { periodOpts } from '../../../utils/constants';
import { formatATOM, formatDate, formatDateWithTime } from '../../../utils';
import API from '../../../api';


const chartName = 'Delegation volume';
const yAxisWidth = 60;
const yTickCount = 10;
const areaName = chartName;
const defaultPeriod = periodOpts[2];

const DelegationVol = () => {
  const theme = useContext(ThemeContext);
  const color = theme.success;
  const res = useRequest(API.getDelegationVol, defaultPeriod.value);
  const delegationVolComp = useChartFormatter(res.resp);

  return (
    <ChartContainer
      title={chartName}
      select={(
        <SelectPeriod
          defaultOpt={defaultPeriod}
          isDisabled={res.isLoading}
          onChange={res.request}
        />
      )}
      chart={(
        <AreaChart
          areaName={areaName}
          isLoading={res.isLoading}
          data={delegationVolComp}
          yAxisLabelsFormatter={formatATOM}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          yAxisDomain={[(dataMin) => Math.round(dataMin), (dataMax) => Math.round(dataMax)]}
          xAxisTickFormatter={formatDate}
          tooltipFormatter={formatATOM}
          tooltipLabelFormatter={formatDateWithTime}
          color={color}
        />
      )}
    />
  );
};

export default DelegationVol;
