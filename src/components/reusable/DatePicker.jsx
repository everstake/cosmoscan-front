import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import DP, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

registerLocale('en-GB', enGB);

// eslint-disable-next-line no-unused-vars
const CustomInput = forwardRef(({ value, onClick, onKeyDown }, ref) => (
  <input
    type="text"
    value={value}
    onClick={onClick}
    onKeyDown={onKeyDown}
    readOnly
  />
));

CustomInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};
CustomInput.defaultProps = {
  value: '',
  onClick: () => null,
  onKeyDown: () => null,
};

const DPWrapper = styled.div`
  ${({
    isOpen,
    theme: {
      black,
      white,
      blue,
      blue2,
      border,
      shadow,
      shadowFocus,
      borderRadiusStandard,
    },
  }) => css`
    align-items: center;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    padding: 2px 15px 2px 15px;
    position: relative;
    max-width: 120px;
    transition: all 0.2s;
    color: ${isOpen ? blue : black};

    :hover,
    &:focus {
      color: ${blue};

      input {
        color: ${blue};
      }
    }

    input {
      border: none;
      font-weight: bold;
      transition: all 0.2s;
      border-radius: ${borderRadiusStandard};
      width: 100%;
      color: ${isOpen ? blue : black};

      &:focus {
        outline: none;
        box-shadow: ${shadowFocus};
      }
    }

    .react-datepicker {
      border: ${border};
      border-radius: ${borderRadiusStandard};
      box-shadow: ${shadow};
    }

    .react-datepicker-popper[data-placement^='bottom']
      .react-datepicker__triangle,
    .react-datepicker-popper[data-placement^='bottom']
      .react-datepicker__triangle::before {
      border-bottom-color: ${blue};
    }
    .react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle,
    .react-datepicker-popper[data-placement^='top']
      .react-datepicker__triangle::before {
      border-top-color: ${blue};
    }

    .react-datepicker__current-month,
    .react-datepicker__day-name {
      color: ${white};
    }

    .react-datepicker__navigation--next {
      border-left-color: ${white};
      transition: all 0.2s;

      &:hover {
        border-left-color: #b3b3b3;
      }
    }

    .react-datepicker__navigation--previous {
      border-right-color: ${white};
      transition: all 0.2s;

      &:hover {
        border-right-color: #b3b3b3;
      }
    }

    .react-datepicker__day--selected {
      background-color: ${blue};

      &:hover {
        background-color: ${blue2};
      }
    }

    .react-datepicker__header,
    .react-datepicker__today-button {
      background-color: ${blue};
      border-bottom-color: ${blue};
      color: ${white};
    }

    .react-datepicker__header {
      border-top-left-radius: ${borderRadiusStandard};
      border-top-right-radius: ${borderRadiusStandard};
    }

    .react-datepicker__today-button {
      border-radius: ${borderRadiusStandard};
      transition: all 0.2s;

      &:hover {
        background-color: ${blue2};
      }
      &:focus {
        box-shadow: ${shadowFocus};
      }
    }

    .react-datepicker__day {
      transition: all 0.2s;

      &--today {
        border-radius: 0.3em;
        border: 2px solid ${blue};
      }

      &--keyboard-selected {
        background-color: ${blue2};
      }

      &:focus {
        outline: none;
        box-shadow: ${shadowFocus};
      }
    }
  `};
`;

const Chevron = styled.div`
  transition: transform 0.2s;
  transform: ${({ isOpen }) => isOpen && 'rotate(180deg)'};
  position: absolute;
  right: 0;
`;

/*
 TODO: Decide whether to convert a date into the UTC format.
  Make the date picker return the UTC time zone
 */
const today = moment().startOf('day').toDate();
const minDate = moment('2020-06-17').startOf('day').toDate();
const maxDate = today;
const handleDateChangeRaw = (e) => {
  e.preventDefault();
};

const DatePicker = ({ className, onChange }) => {
  const [date, setDate] = useState(today);
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (newDate) => {
    setDate(newDate);
    // TODO: Refactor. The component is bind to the specific onChange method.
    onChange(newDate);
  };

  return (
    <DPWrapper className={className} isOpen={isOpen}>
      <FontAwesomeIcon
        icon="calendar-alt"
        style={{ position: 'absolute', left: 0, top: 5 }}
      />
      <DP
        locale="en-GB"
        selected={date}
        onChange={handleChange}
        dateFormat="dd-MM-yyy"
        minDate={minDate}
        maxDate={maxDate}
        todayButton="Today"
        onChangeRaw={handleDateChangeRaw}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        popperPlacement="top-end"
        customInput={<CustomInput />}
      />
      <Chevron isOpen={isOpen}>
        <FontAwesomeIcon icon="chevron-down" />
      </Chevron>
    </DPWrapper>
  );
};

DatePicker.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};
DatePicker.defaultProps = {
  className: '',
  onChange: () => null,
};

CustomInput.displayName = 'CustomInput';

export default DatePicker;
