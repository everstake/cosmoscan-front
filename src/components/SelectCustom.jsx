import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import ValueContainer from './CustomValueContainer';
import { selectStyles } from '../utils/constants';


const SelectCustom = ({
  opts,
  defaultOpt,
  onChange,
  isDisabled,
  className,
  isWithIcon,
  icon,
}) => {
  const [currOpt, setCurrOpt] = useState(defaultOpt);
  const handleChange = (opt) => {
    setCurrOpt(opt);
    onChange(opt);
  };

  return (
    <Select
      options={opts}
      value={currOpt}
      onChange={handleChange}
      noOptionsMessage={() => 'No data'}
      isSearchable={false}
      getOptionLabel={(opt) => opt.label}
      styles={selectStyles}
      components={isWithIcon && { ValueContainer }}
      isDisabled={isDisabled}
      className={className}
      icon={isWithIcon && icon}
    />
  );
};

SelectCustom.propTypes = {
  opts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  defaultOpt: PropTypes.oneOfType([PropTypes.object]),
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  isWithIcon: PropTypes.bool,
  icon: PropTypes.string,
};
SelectCustom.defaultProps = {
  opts: [],
  defaultOpt: {},
  isDisabled: false,
  onChange: () => null,
  className: '',
  isWithIcon: false,
  icon: '',
};


export default SelectCustom;
