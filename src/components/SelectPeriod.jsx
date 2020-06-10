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
    {!!children && (
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
    minWidth: '120px',
    fontSize: '12px',
  }),
  control: (base) => ({
    ...base,
    border: '0',
    backgroundColor: 'transparent',
    fontWeight: 700,
    minHeight: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: theme.black,
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
  singleValue: (base) => ({
    ...base,
    color: 'inherit',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: 15,
  }),
};

const SelectPeriod = ({ defaultVal, onChange }) => {
  const [period, setPeriod] = useState(defaultVal);
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
    />
  );
};

SelectPeriod.propTypes = {
  defaultVal: PropTypes.object,
  onChange: PropTypes.func,
};
SelectPeriod.defaultProps = {
  defaultVal: periodOpts[2],
  onChange: () => null,
};

export default SelectPeriod;
