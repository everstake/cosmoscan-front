import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../utils/theme/colors';

const AtomSpinner = styled.div`
  box-sizing: border-box;
  height: ${({ size }) => `${size}px` || `${60}px`};
  width: ${({ size }) => `${size}px` || `${60}px`};
  overflow: hidden;
  display: inline-block;

  & * {
    box-sizing: border-box;
  }
`;

const Inner = styled.div`
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation-duration: 1s;
  border-left-width: calc(60px / 25);
  border-top-width: calc(60px / 25);
  border-left-color: ${({ color }) => color || 'blue'};
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;

  &:nth-child(1) {
    animation: atom-spinner-animation-1 1s linear infinite;
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
  }

  &:nth-child(2) {
    animation: atom-spinner-animation-2 1s linear infinite;
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
  }

  &:nth-child(3) {
    animation: atom-spinner-animation-3 1s linear infinite;
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
  }

  @keyframes atom-spinner-animation-1 {
    100% {
      transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
    }
  }

  @keyframes atom-spinner-animation-2 {
    100% {
      transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
    }
  }

  @keyframes atom-spinner-animation-3 {
    100% {
      transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
    }
  }
`;

const Circle = styled.div`
  display: block;
  position: absolute;
  color: ${({ color }) => color || 'blue'};
  font-size: calc(60px * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = ({ color, size }) => (
  <AtomSpinner size={size}>
    <Inner>
      <Line color={color} />
      <Line color={color} />
      <Line color={color} />
      <Circle color={color}>&#9679;</Circle>
    </Inner>
  </AtomSpinner>
);

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
Spinner.defaultProps = {
  color: colors.blue,
  size: 60,
};

export default Spinner;
