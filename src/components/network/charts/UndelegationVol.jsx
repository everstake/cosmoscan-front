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


const chartName = 'Undelegation volume';
const yAxisWidth = 70;
const yTickCount = 10;
const areaName = chartName;
const defaultPeriod = periodOpts[2];

const UndelegationVol = () => {
  const theme = useContext(ThemeContext);
  const color = theme.danger;
  const res = useRequest(API.getUndelegationVol, defaultPeriod.value);
  const undelegationVolComp = useChartFormatter(res.resp);

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
          data={undelegationVolComp}
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

export default UndelegationVol;
