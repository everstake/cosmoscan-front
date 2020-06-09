import React, {
  useContext, useMemo,
} from 'react';
import { ThemeContext } from 'styled-components';
import moment from 'moment';
import useRequest from '../../../hooks/useRequest';
import AreaChart from '../../chart-types/AreaChart';
import { formatATOM, formatDate, formatDateWithTime } from '../../../utils';
import ChartContainer from '../../../layouts/ChartContainer';
import API from '../../../api';


const TxVol = () => {
  const theme = useContext(ThemeContext);
  const chartName = 'Fee volume';
  const yAxisWidth = 76;
  const yTickCount = 10;
  const areaName = chartName;
  const color = theme.navyBlue;

  const res = useRequest(API.getFeeVol, {
    // TODO: Replace the hardcoded default. All the possible options are in SelectPeriod.jsx
    by: 'day',
    from: moment.utc().subtract(30, 'days').startOf('day').unix(),
    to: moment.utc().startOf('day').unix(),
  });

  // TODO: Duplicated code. Extract somewhere
  const feeVolComp = useMemo(() => {
    if (!res.resp || !res.resp.length) return [];

    return res.resp.map((e) => ({
      x: e.time,
      y: +e.value,
    }));
  }, [res.resp]);

  return (
    <ChartContainer
      title={chartName}
      onSelectChange={res.request}
      chart={(
        <AreaChart
          data={feeVolComp}
          yAxisLabelsFormatter={formatATOM}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          xAxisTickFormatter={formatDate}
          areaName={areaName}
          color={color}
          tooltipFormatter={formatATOM}
          tooltipLabelFormatter={formatDateWithTime}
        />
      )}
    />
  );
};

export default TxVol;
