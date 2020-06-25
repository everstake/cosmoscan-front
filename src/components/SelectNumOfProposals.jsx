import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
// import ValueContainer from './CustomValueContainer';
import { selectStyles } from '../utils/constants';


const numsOfProposals = [
  { label: 'Last 3', value: 3 },
  { label: 'Last 10', value: 10 },
  { label: 'All proposals', value: Infinity },
];


const SelectNumOfProposals = ({
  opts, defaultOpt, onChange, isDisabled, className,
}) => {
  const [currOpt, setCurrOpt] = useState(defaultOpt);
  const handleChange = (opt) => {
    setCurrOpt(opt);
    // TODO: Refactor. The component is bound to the specific onChange method.
    onChange(opt.value);
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
      // components={{ ValueContainer }}
      isDisabled={isDisabled}
      className={className}
      // icon=""
    />
  );
};

SelectNumOfProposals.propTypes = {
  opts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  defaultOpt: PropTypes.oneOfType([PropTypes.object]),
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
SelectNumOfProposals.defaultProps = {
  opts: numsOfProposals,
  defaultOpt: numsOfProposals[2],
  isDisabled: false,
  onChange: () => null,
  className: '',
};


export default SelectNumOfProposals;
