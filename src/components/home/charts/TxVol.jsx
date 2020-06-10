import React, { useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
import moment from 'moment';
import useRequest from '../../../hooks/useRequest';
import AreaChart from '../../chart-types/AreaChart';
import ChartContainer from '../../../layouts/ChartContainer';
import { formatATOM, formatDate, formatDateWithTime } from '../../../utils';
import API from '../../../api';

const TxVol = () => {
  const chartName = 'Transaction volume';
  const yAxisWidth = 75;
  const yTickCount = 10;
  const areaName = 'Tx volume';
  // TODO: Configure right navigation
  // const history = useHistory();
  // const onDotClick = () => history.push('/network');
  const isDotClickable = false;

  const res = useRequest(API.getTxVol, {
    // TODO: Replace the hardcoded default. All the possible options are in SelectPeriod.jsx
    by: 'day',
    from: moment.utc().subtract(30, 'days').startOf('day').unix(),
    to: moment.utc().startOf('day').unix(),
  });

  // TODO: Duplicated code. Extract somewhere
  const txVolComp = useMemo(() => {
    if (!res.resp || !res.resp.length) return [];

    return res.resp.map((e) => ({
      x: e.time,
      y: +e.value,
    }));
  }, [res.resp]);

  return (
    <div>
      {res.resp
      && (
      <ChartContainer
        title={chartName}
        onSelectChange={res.request}
        chart={(
          <AreaChart
            data={txVolComp}
            yAxisLabelsFormatter={formatATOM}
            yAxisWidth={yAxisWidth}
            yTickCount={yTickCount}
            xAxisTickFormatter={formatDate}
            areaName={areaName}
            isDotClickable={isDotClickable}
            tooltipFormatter={formatATOM}
            tooltipLabelFormatter={formatDateWithTime}
          />
        )}
      />
      )}
    </div>
  );
};

export default TxVol;
