import moment from 'moment';

export const periodOpts = [
  {
    name: 'Last day',
    value: {
      by: 'hour',
      from: moment.utc().subtract(1, 'days').startOf('day').unix(),
      to: moment.utc().subtract(1, 'days').endOf('day').unix(),
    },
  },
  {
    name: 'Last week',
    value: {
      by: 'day',
      from: moment.utc().subtract(7, 'days').startOf('day').unix(),
      to: moment.utc().startOf('day').unix(),
    },
  },
  {
    name: 'Last month',
    value: {
      by: 'day',
      from: moment.utc().subtract(30, 'days').startOf('day').unix(),
      to: moment.utc().startOf('day').unix(),
    },
  },
  {
    name: 'Last 3 months',
    value: {
      by: 'day',
      from: moment.utc().subtract(60, 'days').startOf('day').unix(),
      to: moment.utc().startOf('day').unix(),
    },
  },
];

export const periodOptsStats = [
  { name: 'Last day', value: 'd1' },
  { name: 'Last week', value: 'd7' },
  { name: 'Last month', value: 'd30' },
  { name: 'Last 3 months', value: 'd90' },
];
