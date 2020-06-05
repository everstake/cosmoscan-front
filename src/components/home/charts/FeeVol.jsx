import React, { useContext, useState, useEffect, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import AreaChart from '../../chart-types/AreaChart';
import { formatATOM } from '../../../utils';
import ChartContainer from '../../../layouts/ChartContainer';
import moment from 'moment';
import API from '../../../api';


const TxVol = () => {
  const theme = useContext(ThemeContext);
  const chartName = 'Fee volume';
  const yAxisWidth = 76;
  const yTickCount = 10;
  const areaUnit = ' ATOM';
  const areaName = chartName;
  const color = theme.navyBlue;
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

  const [feeVolState, setFeeVolState] = useState({ data: [], isLoading: false });
  const getFeeVol = async () => {
    try {
      setFeeVolState({ data: [...feeVolState.data], isLoading: true });
      const resp = await API.getFeeVol({ by, from, to });
      setFeeVolState({ data: [...feeVolState.data, ...resp.data], isLoading: false });
    } catch (e) {
      // TODO: Implement the error handler
      console.error(e);
      setFeeVolState({ data: [...feeVolState.data], isLoading: false });
    }
  };

  useEffect(() => {
    getFeeVol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const feeVolComp = useMemo(() => {
    if (!feeVolState.data || !feeVolState.data.length) return [];

    return feeVolState.data.map((e) => ({
      x: moment.unix(e.time).format('DD-MM-YYYY'),
      y: +e.value,
    }));
  }, [feeVolState.data]);

  return (
    <ChartContainer
      title={chartName}
      selectOpts={selectOpts}
      onSelectChange={onSelectChange}
      isPeriodSelectable={false}
      chart={(
        <AreaChart
          data={feeVolComp}
          yAxisLabelsFormatter={formatATOM}
          yAxisWidth={yAxisWidth}
          yTickCount={yTickCount}
          areaUnit={areaUnit}
          areaName={areaName}
          color={color}
          tooltipFormatter={formatATOM}
        />
      )}
    />
  );
};

export default TxVol;
