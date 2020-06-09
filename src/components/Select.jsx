import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const SelectStyled = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  
  &:hover, &:focus {
    color: ${({ theme: { blue } }) => blue};
       
    select {
      color: ${({ theme: { blue } }) => blue};
    }
    
    option {
      color: ${({ theme: { black } }) => black};
    }
  }
  
  .fa-calendar-alt {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    pointer-events: none;
  }
  
  .fa-chevron-down {
    position: absolute;
    right: 3px;
    pointer-events: none;
    font-size: ${({ theme: { fs16 } }) => fs16};
    padding-left: 5px;
  }
  
  select {
    padding-left: 15px;
    padding-right: 15px;
    background-color: transparent;
    border: none;
    font-weight: 700;
    color: ${({ theme: { black } }) => black};
    cursor: pointer;
    appearance: none;
    transition: color 0.2s;
  }
`;

const Select = ({ opts, defaultOpt, onChange }) => {
  const [selectedVal, setSelectedVal] = useState(defaultOpt);
  const onSelectChange = (event) => {
    const sel = opts.find((e) => (e.name === event.target.value));
    setSelectedVal(sel);
    // TODO: Define why not possible to use the state value
    onChange(sel.value);
  };

  return (
    <SelectStyled>
      <FontAwesomeIcon
        icon="calendar-alt"
      />
      <select
        value={selectedVal.name}
        onChange={onSelectChange}
        // onBlur={onSelectChange}
      >
        {opts && opts.map((opt) => (
          <option
            key={opt.name}
            value={opt.name}
          >
            { opt.name }
          </option>
        ))}
      </select>
      <FontAwesomeIcon
        icon="chevron-down"
      />
    </SelectStyled>
  );
};

Select.propTypes = {
  opts: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultOpt: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
