import moment from 'moment';
import numeral from 'numeral';
import { networkList } from './constants';

export const removeProtocol = (url) => url.replace(/(^\w+:|^)\/\//, '');

export const addProtocol = (url) => `https://${removeProtocol(url)}`;

export const formatSec = (num) => `${num} sec`;

export const formatUSD = (amount) => `$${numeral(amount).format('0,0[.][00]')}`;

export const formatTokenWithFixedFractional = (amount, precision = 5) => {
  let fractionalSize = '';
  for (let i = 0; i < precision; i += 1) {
    fractionalSize += '0';
  }

  return `${numeral(amount).format(`0,0.${fractionalSize}`)} ${
    networkList.find((e) => e.value === sessionStorage.getItem('chain'))
      .coinCode
  }`;
};

export const formatTokenAmount = (amount) =>
  `${numeral(amount).format('0,0[.][00000]')}`;

export const formatPercentValue = (val) => `${val}%`;

export const formatPercentDec = (val) => `${numeral(val).format('0,0[.][0]')}%`;

export const roundToPrecision = (val, precision = 0) => {
  const multiplier = 10 ** precision;
  return Math.round(val * multiplier) / multiplier;
};

// export const formatPercentDec2 = (val) => `${numeral(val).format('0,0[.][00]')}%`;
// TODO: Find a fix for Numeral.js.
//  format() returns NaN if the number is with too large precision (e-7)
export const formatPercentDec2 = (val) => {
  const res = numeral(val).format('0,0[.][00]');
  if (res === 'NaN') return `${roundToPrecision(val, 2)}%`;
  return `${res}%`;
};

export const formatToken = (amount) => {
  const res = numeral(amount).format('0,0[.][0000]');

  if (res === 'NaN') {
    return `${roundToPrecision(amount, 5)} ${
      networkList.find((e) => e.value === sessionStorage.getItem('chain'))
        .coinCode
    }`;
  }
  if (amount < 0.0001) {
    return `${numeral(amount).format('0[.][00000000]')} ${
      networkList.find((e) => e.value === sessionStorage.getItem('chain'))
        .coinCode
    }`;
  }

  return `${res} ${
    networkList.find((e) => e.value === sessionStorage.getItem('chain'))
      .coinCode
  }`;
};

export const formatDateWithTime = (val) =>
  moment.unix(val).format('DD-MM-YYYY HH:mm');

export const formatDate = (val) => moment.unix(val).format('DD-MM-YYYY');

export const formatGB = (val) => `${val} GB`;

export const formatId = (val) => `#${val}`;

export const formatNum = (num) => {
  if (typeof num !== 'number') return num;
  // TODO: Make the precision dynamic
  return numeral(num).format('0,0[.][000000]');
};

export const formatDays = (val) => `${formatNum(val)} days`;

// eslint-disable-next-line no-unused-vars
export const calculatePercent = (total, knownVal, isKnownValPercent = false) =>
  formatPercentDec2((Number(knownVal) * 100) / Number(total));

export const formatStatuses = (status) => {
  // TODO: Pass transaltions keys
  const statusMap = {
    abstain: 'Abstain',
    nowithveto: 'No with veto',
    no: 'No',
    yes: 'Yes',
  };

  return statusMap[status.toLowerCase()];
};

export const removeTrailingSlash = (string) =>
  String(string).replace(/\/+$/, '');

export const noString = (string) => string || '-----';

export const formatChartData = (chartDataRaw) => {
  if (!chartDataRaw || !chartDataRaw) return [];

  return chartDataRaw.map((e) => ({
    x: e.time,
    y: +e.value,
  }));
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

  return [...new Array(30)].map((i, idx) =>
    moment.utc(thirtyDaysAgo).add(idx, 'days').format('DD-MM-YYYY'),
  );
})();

export const changeChain = () => {
  switch (sessionStorage.getItem('chain')) {
    case 'cosmos':
      return process.env.REACT_APP_API_COSMOS;
    case 'persistence':
      return process.env.REACT_APP_API_PERSISTENCE;
    case 'bitsong':
      return process.env.REACT_APP_API_BITSONG;
    default:
      return process.env.REACT_APP_API_COSMOS;
  }
};
