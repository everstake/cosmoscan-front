import { useMemo } from 'react';
import { formatChartData } from '../utils';

const useChartFormatter = (chartData) => {
  return useMemo(() => formatChartData(chartData), [chartData]);
};

export default useChartFormatter;
