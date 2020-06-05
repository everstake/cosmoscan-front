import React from 'react';
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

const Select = ({ opts, onChange }) => (
  <SelectStyled>
    <FontAwesomeIcon
      icon="calendar-alt"
    />
    <select onChange={onChange}>
      {opts && opts.map((e) => <option key={e.name}>{ e.name }</option>)}
    </select>
    <FontAwesomeIcon
      icon="chevron-down"
    />
  </SelectStyled>
);

Select.propTypes = {
  opts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
