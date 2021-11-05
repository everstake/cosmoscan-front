import React from 'react';
import PropTypes from 'prop-types';
import { periodOpts } from '../utils/constants';
import SelectCustom from './SelectCustom';

const SelectPeriod = ({ defaultPeriod, onChange, isDisabled }) => {
  const handleChange = (opt) => {
    onChange(opt.value);
  };

  return (
    <SelectCustom
      opts={periodOpts}
      defaultOpt={defaultPeriod}
      onChange={handleChange}
      isDisabled={isDisabled}
      isWithIcon
      icon="calendar-alt"
    />
  );
};

SelectPeriod.propTypes = {
  defaultPeriod: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
};
SelectPeriod.defaultProps = {
  defaultPeriod: periodOpts[2],
  onChange: () => null,
  isDisabled: false,
};

export default SelectPeriod;
