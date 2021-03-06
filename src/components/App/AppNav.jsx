import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import Dropdown from '../styled/Dropdown';
import useRoutes from './hooks/useRoutes';

const AppNavWrapper = styled.nav`
  align-items: center;
  display: flex;
`;

const AppNavUl = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
  margin-bottom: 0;
  
  li {
    margin-right: 40px;
    
    @media(max-width: ${({ theme }) => theme.xlDown}) {
      margin-right: 15px;
    }
  }
`;

const AppNavLinkStyles = css`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fs14};
  transition: color 0.2s;

  &:hover, &:focus, &.active {
   color: ${({ theme }) => theme.blue};
   text-decoration: none;
  }
`;

const AppNavLink = styled(NavLink)`
  ${AppNavLinkStyles};
`;

const AppNavButtonLink = styled.button`
  ${AppNavLinkStyles};
  background-color: transparent;
  border: none;
  padding: 0;
`;

const AppNav = () => {
  const routes = useRoutes();

  return (
    <AppNavWrapper>
      <AppNavUl>
        {routes.map((route) => (
          <li key={route.name}>
            {
              route.path
                ? (
                  <AppNavLink
                    to={route.path}
                    exact
                  >
                    {route.name}
                  </AppNavLink>
                )

                : (
                  <Dropdown navbar>
                    <Dropdown.Toggle
                      variant="link"
                      as={AppNavButtonLink}
                    >
                      { route.name }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {
                        route.paths.map((e) => (
                          <Dropdown.Item
                            key={e.name}
                            as={NavLink}
                            to={e.path}
                          >
                            {e.name}
                          </Dropdown.Item>
                        ))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                )
            }
          </li>
        ))}
      </AppNavUl>
    </AppNavWrapper>
  );
};

export default AppNav;
