import PropTypes from 'prop-types';
import styled, { isStyledComponent } from 'styled-components';
import React from 'react';
import Flex from '../components/styled/Flex';

const Btn = styled.button`
  cursor: pointer;
  color: black;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Wrap = styled(Flex.FlexCenterColumn)`
  z-index: 0;
  position: absolute;
  bottom: 0;

  width: 100%;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.4s, bottom 0.2s ease-in;
`;

const BtnWrap = isStyledComponent(Wrap) ? Wrap : styled(Wrap)``;

const ChartWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:hover {
    & ${BtnWrap} {
      z-index: 100;
      opacity: 1;
      bottom: -55px;
      background-color: #fff;
      border: 1px solid rgba(211, 211, 211, 0.5);
    }
  }
`;

const ChartWrapper = ({ children, title, handleDownload }) => {
  const url = window.location.href;

  return (
    <ChartWrap>
      {children}

      <BtnWrap>
        <Btn type="button" onClick={() => handleDownload(title)}>
          Download chart
        </Btn>

        <a
          type="button"
          role="button"
          title="Share on twitter"
          href={`https://twitter.com/intent/tweet?text=${title}:&url=${url}`}
          rel="noreferrer"
          target="_blank"
        >
          Twitter
        </a>
      </BtnWrap>
    </ChartWrap>
  );
};

ChartWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  handleDownload: PropTypes.func,
};

ChartWrapper.defaultProps = {
  title: '',
  handleDownload: () => null,
};

export default ChartWrapper;
