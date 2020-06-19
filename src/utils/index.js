import moment from 'moment';
import numeral from 'numeral';

export const formatSec = (num) => `${num} sec`;

export const formatUSD = (amount) => `$${numeral(amount).format('0,0[.][00]')}`;

export const formatATOM = (amount) => `${numeral(amount).format('0,0[.][00000]')} ATOM`;

export const formatATOMAmount = (amount) => `${numeral(amount).format('0,0[.][00000]')}`;

export const formatPercentValue = (val) => `${val}%`;

export const formatPercentDec = (val) => `${numeral(val).format('0,0[.][0]')}%`;

export const formatPercentDec2 = (val) => `${numeral(val).format('0,0[.][00]')}%`;

export const formatDateWithTime = (val) => moment.unix(val).format('DD-MM-YYYY HH:mm');

export const formatDate = (val) => moment.unix(val).format('DD-MM-YYYY');

export const formatGB = (val) => `${val} GB`;

export const removeTrailingSlash = (string) => String(string).replace(/\/+$/, '');

export const noString = (string) => string || '-----';

export const formatChartData = (chartDataRaw) => {
  if (!chartDataRaw || !chartDataRaw) return [];

  return chartDataRaw.map((e) => ({
    x: e.time,
    y: +e.value,
  }));
};

export const formatNum = (num) => {
  if (typeof num !== 'number') return num;
  // TODO: Make the precision dynamic
  return numeral(num).format('0,0[.][000000]');
};

export const roundToPrecision = (val, precision = 0) => {
  const multiplier = 10 ** precision;
  return Math.round(val * multiplier) / multiplier;
};

export const formatSeconds = (seconds) => {
  const date = new Date(0);
  date.setMilliseconds(seconds * 1000); // specify value for MILLISECONDS here
  // less than a second
  if (seconds < 1) {
    return `${date.getMilliseconds()} ms`;
  }
  // more than a minute
  if (seconds > 59) {
    return `${date.getMinutes()} m ${date.getSeconds()} s ${date.getMilliseconds()} ms`;
  }
  // more than an hour
  if (seconds > 86399) {
    return `${date.getHours()} h ${date.getMinutes()} m ${date.getSeconds()} s ${date.getMilliseconds()} ms`;
  }
  // just seconds
  return `${date.getSeconds()} s ${date.getMilliseconds()} ms`;
};

export const lastThirtyDays = (() => {
  const thirtyDaysAgo = moment.utc().startOf('day').subtract(29, 'days');

  return [...new Array(30)]
    .map((i, idx) => moment
      .utc(thirtyDaysAgo)
      .add(idx, 'days')
      .format('DD-MM-YYYY'));
})();
