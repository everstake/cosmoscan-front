import React from 'react';
import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { roundToPrecision } from '../utils';

const PercentSpan = styled.span`
  color: ${({ increase, theme: { success, danger, black } }) =>
    (() => {
      // eslint-disable-next-line no-restricted-globals
      if (!isFinite(increase)) {
        return black;
      }
      if (Math.sign(increase) === 1) {
        return success;
      }
      if (Math.sign(increase) === -1) {
        return danger;
      }

      return black;
    })()};
`;

const Percent = ({ prevVal, currVal }) => {
  const percentIncrease = roundToPrecision(
    ((currVal - prevVal) / prevVal) * 100,
    2,
  );
  const isIncrease = Math.sign(percentIncrease) === 1;

  return (
    <PercentSpan increase={percentIncrease}>
      {/* {percentIncrease !== 0 */}
      {/* && ( */}
      {/* <FontAwesomeIcon */}
      {/*   icon={isIncrease ? 'chevron-up' : 'chevron-down'} */}
      {/*   className="mr-1" */}
      {/* /> */}
      {/* )} */}
      {/* eslint-disable-next-line no-restricted-globals */}
      {isFinite(percentIncrease)
        ? `${isIncrease ? '+' : ''}${percentIncrease}%`
        : 'Incr./decr. from 0'}
    </PercentSpan>
  );
};

Percent.propTypes = {
  prevVal: PropTypes.number,
  currVal: PropTypes.number,
};
Percent.defaultProps = {
  prevVal: 0,
  currVal: 0,
};

export default Percent;
