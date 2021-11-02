import moment from 'moment';
import theme from '../theme';

export const periodOpts = [
  {
    label: 'Last day',
    value: {
      by: 'hour',
      from: moment.utc().subtract(1, 'days').startOf('day').unix(),
      to: moment.utc().subtract(1, 'days').endOf('day').unix(),
    },
  },
  {
    label: 'Last week',
    value: {
      by: 'day',
      from: moment.utc().subtract(7, 'days').startOf('day').unix(),
      to: moment.utc().startOf('day').unix(),
    },
  },
  {
    label: 'Last month',
    value: {
      by: 'day',
      from: moment.utc().subtract(30, 'days').startOf('day').unix(),
      to: moment.utc().startOf('day').unix(),
    },
  },
  {
    label: 'Last 3 months',
    value: {
      by: 'day',
      from: moment.utc().subtract(60, 'days').startOf('day').unix(),
      to: moment.utc().startOf('day').unix(),
    },
  },
];

export const numsOfProposals = [
  { label: 'Last 3', value: 3 },
  { label: 'Last 10', value: 10 },
  { label: 'All proposals', value: Infinity },
];

export const voterTypes = [
  { label: 'All voters', value: 'all' },
  { label: 'Validators', value: 'validators' },
  { label: 'Individual addresses', value: 'addresses' },
];

export const selectStyles = {
  container: (base) => ({
    ...base,
    minWidth: '125px',
    fontSize: '12px',
  }),
  control: (base, state) => ({
    ...base,
    border: '0',
    backgroundColor: 'transparent',
    fontWeight: 700,
    minHeight: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: state.isDisabled ? theme.grey : theme.black,
    '&:hover': {
      color: theme.blue,
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: 0,
    color: 'inherit',
    transition: 'transform 0.2s',
    transform: state.selectProps.menuIsOpen ? 'rotateX(180deg)' : '',
    '&:hover': {
      color: 'inherit',
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: 15,
  }),
  singleValue: (base) => ({
    ...base,
    color: 'inherit',
  }),
  menu: (base) => ({
    ...base,
    marginTop: '1px',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? theme.blue : 'transparent',
    padding: '4px 10px',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: !state.isSelected ? theme.blue4 : '',
    },
    '&:active': {
      backgroundColor: theme.blue4,
    },
  }),
};

export const networkList = [
  { label: 'COSMOS', value: 'cosmos', coinCode: 'ATOM' },
  { label: 'PERSISTENCE', value: 'persistence', coinCode: 'XPRT' },
  { label: 'BITSONG', value: 'bitsong', coinCode: 'BTSG' },
];

export const bluePalette = [
  '#0C39D0',
  '#234FE3',
  '#476eeb',
  '#6B8AF0',
  '#97ADF5',
  '#440BD2',
  '#5921E4',
  '#7646EC',
  '#916AF0',
  '#B296F6',
  '#067ACB',
  '#178DE0',
  '#3DA1E9',
  '#63B5EE',
  '#91CBF4',
  '#0C227C',
  '#112DA0',
  '#2946BA',
  '#4861C4',
  '#6D81D4',
];
