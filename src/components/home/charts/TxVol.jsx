import React, { useState, useEffect, useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
import moment from 'moment';
import AreaChart from '../../chart-types/AreaChart';
import ChartContainer from '../../../layouts/ChartContainer';
import { formatATOM } from '../../../utils';
import API from '../../../api';

const TxVol = () => {
  const chartName = 'Transaction volume';
  const yAxisWidth = 75;
  const yTickCount = 10;
  const areaUnit = ' ATOM';
  const areaName = 'Tx volume';
  // TODO: Configure right navigation
  // const history = useHistory();
  // const onDotClick = () => history.push('/network');
  const isDotClickable = false;
  const selectOpts = [
    { name: 'Month', value: 'month' },
    { name: '2 months', value: '2months' },
    { name: '3 months', value: '23months' },
    { name: 'All time', value: 'All time' },
  ];
  const onSelectChange = () => alert('Select changed');

  const by = 'day';
  const to = moment.utc().startOf('day').unix();
  const from = moment.utc().subtract(30, 'days').startOf('day').unix();

  const [txVolState, setTxVolState] = useState({ data: [], isLoading: false });
  const getTxVol = async () => {
    try {
      setTxVolState({ data: [...txVolState.data], isLoading: true });
      const resp = await API.getTxVol({ by, from, to });
      setTxVolState({ data: [...txVolState.data, ...resp.data], isLoading: false });
    } catch (e) {
      // TODO: Implement the error handler
      console.error(e);
      setTxVolState({ data: [...txVolState.data], isLoading: false });
    }
  };

  useEffect(() => {
    getTxVol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const txVolComp = useMemo(() => {
    if (!txVolState.data || !txVolState.data.length) return [];

    return txVolState.data.map((e) => ({
      x: moment.unix(e.time).format('DD-MM-YYYY'),
      // y: Math.round(e.value * 1) / 1,
      // y: Math.round(e.value * 1) / 1,
      y: +e.value,
    }));
  }, [txVolState.data]);

  return (
    <div>
      {txVolState.data
      && (
      <ChartContainer
        title={chartName}
        selectOpts={selectOpts}
        onSelectChange={onSelectChange}
        isPeriodSelectable={false}
        chart={(
          <AreaChart
            data={txVolComp}
            yAxisLabelsFormatter={formatATOM}
            yAxisWidth={yAxisWidth}
            yTickCount={yTickCount}
            areaUnit={areaUnit}
            areaName={areaName}
            isDotClickable={isDotClickable}
            tooltipFormatter={formatATOM}
          />
        )}
      />
      )}
    </div>
  );
};

export default TxVol;
