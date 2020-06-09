import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from './Select';

const SelectPeriod = ({ onChange }) => {
  const opts = [
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

  return (
    <Select
      opts={opts}
      defaultOpt={opts[2]}
      onChange={onChange}
    />
  );
};

SelectPeriod.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SelectPeriod;
