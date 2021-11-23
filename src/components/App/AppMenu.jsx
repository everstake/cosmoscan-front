import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import useRoutes from './hooks/useRoutes';
import Dropdown from '../styled/Dropdown';
import A from '../styled/A';
import SelectChain from '../SelectChain';
import Store from '../../store';

const BtnReset = css`
  background-color: transparent;
  border: none;
  padding: 0;
`;

const MenuToggler = styled.button`
  ${BtnReset};
  color: ${({ theme, isOpen }) => (isOpen ? theme.danger : theme.white)};
`;

const AppMenuContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.heightHeader};
  bottom: 0;
  left: 0;
  z-index: 2;
  transform: translateX(-100%);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.whiteGrey2};
  align-items: center;
  padding: 15px;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateX(0);
    `}
`;

const AppMenuUl = styled.ul`
  list-style-type: none;
  text-align: center;
  padding-left: 0;
  margin: 40px 0;

  li:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const AppMenuLink = styled(NavLink)`
  &:hover {
    text-decoration: none;
  }
`;

const BtnLink = styled(A).attrs({
  as: 'button',
})`
  ${BtnReset};
`;

const DropdownMenuStatic = styled(Dropdown.Menu)`
  position: static !important;
  float: none;
  transform: translate3d(0, 10px, 0) !important;
  border: none;

  .dropdown-item {
    text-align: center;
  }
`;

const currentYear = new Date().getFullYear();

const AppMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const routes = useRoutes();
  const { chain } = useContext(Store);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <MenuToggler onClick={toggleMenu} isOpen={isOpen}>
        <FontAwesomeIcon icon={isOpen ? 'times' : 'bars'} size="2x" />
      </MenuToggler>

      <AppMenuContainer isOpen={isOpen}>
        <div>
          <nav>
            <AppMenuUl>
              {routes.map((route) => (
                <li key={route.name}>
                  {route.path ? (
                    <AppMenuLink
                      to={`/${chain.value}${route.path}`}
                      onClick={closeMenu}
                      exact
                    >
                      {route.name}
                    </AppMenuLink>
                  ) : (
                    <Dropdown navbar>
                      <Dropdown.Toggle variant="link" as={BtnLink}>
                        {route.name}
                      </Dropdown.Toggle>

                      <DropdownMenuStatic>
                        {route.paths.map((e) => (
                          <Dropdown.Item
                            key={e.name}
                            as={NavLink}
                            to={`/${chain.value}${e.path}`}
                            onClick={closeMenu}
                          >
                            {e.name}
                          </Dropdown.Item>
                        ))}
                      </DropdownMenuStatic>
                    </Dropdown>
                  )}
                </li>
              ))}
            </AppMenuUl>

            <SelectChain />
          </nav>

          <div>{/*  TODO: Settings buttons  */}</div>
        </div>

        <div className="mt-auto">{`© ${currentYear} All rights reserved`}</div>
      </AppMenuContainer>
    </div>
  );
};

export default AppMenu;
