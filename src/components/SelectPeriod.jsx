import React from 'react';
import PropTypes from 'prop-types';
import { periodOpts } from '../utils/constants';
import SelectCustom from './SelectCustom';


const SelectPeriod = ({
  opts, defaultPeriod, onChange, isDisabled, className,
}) => {
  const handleChange = (opt) => {
    onChange(opt.value);
  };

  return (
    <SelectCustom
      opts={opts}
      defaultOpt={defaultPeriod}
      onChange={handleChange}
      isDisabled={isDisabled}
      className={className}
      isWithIcon
      icon="calendar-alt"
    />
  );
};

SelectPeriod.propTypes = {
  opts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  defaultPeriod: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};
SelectPeriod.defaultProps = {
  opts: periodOpts,
  defaultPeriod: periodOpts[2],
  onChange: () => null,
  isDisabled: false,
  className: '',
};

export default SelectPeriod;
