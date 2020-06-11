import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { periodOpts } from '../utils/constants';
import theme from '../utils/theme';


const ValueContainer = ({ children, ...props }) => (
  components.ValueContainer && (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <components.ValueContainer {...props}>
    {children && (
    <FontAwesomeIcon
      icon="calendar-alt"
      style={{ position: 'absolute', left: 0 }}
    />
    )}
    {children}
  </components.ValueContainer>
  )
);

ValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
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

const SelectPeriod = ({ defaultOpt, onChange, isDisabled }) => {
  const [period, setPeriod] = useState(defaultOpt);
  const handleChange = (opt) => {
    setPeriod(opt);
    onChange(opt.value);
  };

  return (
    <Select
      options={periodOpts}
      value={period}
      onChange={handleChange}
      noOptionsMessage={() => 'No data'}
      isSearchable={false}
      getOptionLabel={(opt) => opt.name}
      styles={styles}
      components={{ ValueContainer }}
      isDisabled={isDisabled}
    />
  );
};

SelectPeriod.propTypes = {
  defaultOpt: PropTypes.oneOfType([PropTypes.object]),
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};
SelectPeriod.defaultProps = {
  defaultOpt: periodOpts[2],
  isDisabled: false,
  onChange: () => null,
};

export default SelectPeriod;
