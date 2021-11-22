import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../components/styled/CustomBsGrid';
import Title from '../components/styled/Title';
import Store from '../store';

// TODO: Extract if reused. Make a modifier
const LinkBtn = styled(NavLink)`
  background-color: ${({ theme: { blue } }) => blue};
  border-radius: ${({ theme: { borderRadiusStandard } }) =>
    borderRadiusStandard};
  border-color: ${({ theme: { blue } }) => blue};
  color: ${({ theme: { white } }) => white} !important;
  display: inline-block;
  font-weight: 500;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  transition: background-color 0.2s, box-shadow 0.2s;
  text-transform: uppercase;
  text-align: center;
  vertical-align: middle;

  &:hover,
  &:focus {
    background-color: ${({ theme: { blue2 } }) => blue2};
    text-decoration: none;
  }

  &:focus {
    outline: 0;
    box-shadow: ${({ theme }) => theme.shadowFocus};
  }

  &:not(:disabled):not(.disabled):active {
    background-color: ${({ theme: { blue3 } }) => blue3};
  }
`;

const NotFound = () => {
  const { chain } = useContext(Store);
  return (
    <Container className="text-center">
      <Helmet>
        <title>404 Not found | Cosmoscan</title>
        <meta name="description" content="Oops, nothing here." />
        <meta itemProp="description" content="Oops, nothing here." />
        <meta property="og:description" content="Oops, nothing here." />
        <meta name="twitter:description" content="Oops, nothing here." />
      </Helmet>

      <Title>404 Not found | Cosmoscan</Title>
      <p>
        Oops! <br />
        Unfortunately, the page you are looking for is not found... &#128577;
      </p>
      <div>
        <LinkBtn to={`/${chain.value}`}>Home</LinkBtn>
      </div>
    </Container>
  );
};

export default NotFound;
