import React, { useContext } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from '../styled/CustomBsGrid';
import Dropdown from '../styled/Dropdown';
import Title from '../styled/Title';
import useRoutes from './hooks/useRoutes';
import Store from '../../store';

const Footer = styled.footer`
  flex-shrink: 0;
  border-top: ${({ theme: { border } }) => border};
`;

const FooterTop = styled.div`
  padding: 80px 0;
  background-color: ${({ theme }) => theme.white};
`;

const FooterBottom = styled.div`
  background-color: ${({ theme }) => theme.whiteGrey3};
  padding: 25px 15px;
  text-align: center;
  color: #999;
`;

const FooterUl = styled.ul`
  padding: 0;
  list-style-type: none;
  margin-bottom: 0;

  li:not(:last-child) {
    margin-bottom: 25px;
  }
`;

const FooterNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.grey};
  text-transform: uppercase;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    text-decoration: none;
  }
  &:hover,
  &.active,
  &:focus {
    color: ${({ theme }) => theme.blue};
  }
`;

const FooterButtonNavLink = styled(FooterNavLink).attrs({
  as: 'button',
})`
  padding: 0;
  background-color: transparent;
  border: none;
`;

const FooterA = styled(FooterNavLink).attrs({
  as: 'a',
})``;

const FooterTitle = styled.h3`
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.fs14};
  text-transform: uppercase;
`;

const FooterItem = styled.div`
  max-width: 265px;
  margin-bottom: 40px;
`;

// TODO: Extract if reused. Make a modifier
const P = styled.p`
  color: ${({ theme }) => theme.grey};
  font-weight: 500;
`;

const currentYear = new Date().getFullYear();
const socials = [
  {
    title: 'Twitter',
    icon: <FontAwesomeIcon className="mr-2" icon={['fab', 'twitter']} />,
    href: 'https://twitter.com/everstake_pool',
  },
  {
    title: 'Telegram',
    icon: <FontAwesomeIcon className="mr-2" icon={['fab', 'telegram-plane']} />,
    href: 'https://t.me/everstake_chat',
  },
  {
    title: 'Medium',
    icon: <FontAwesomeIcon className="mr-2" icon={['fab', 'medium-m']} />,
    href: 'https://medium.com/@everstake',
  },
  {
    title: 'Reddit',
    icon: <FontAwesomeIcon className="mr-2" icon={['fab', 'reddit-alien']} />,
    href: 'https://www.reddit.com/r/Everstake',
  },
];
const behind = [
  {
    title: 'API',
    href: 'https://api.cosmoscan.net/api',
  },
  {
    title: 'Front repo',
    href: 'https://github.com/everstake/cosmoscan-front',
  },
  {
    title: 'Back repo',
    href: 'https://github.com/everstake/cosmoscan-api',
  },
];

const AppFooter = () => {
  const routes = useRoutes();
  const { chain } = useContext(Store);

  return (
    <Footer>
      <FooterTop>
        <Container>
          <Row>
            <Col md={6} lg={3}>
              <FooterItem>
                <Title modifiers="blue">Cosmoscan</Title>
                <P>
                  Cosmoscan is an open-source analytics platform for Cosmos
                  network made by Everstake.
                </P>
              </FooterItem>
            </Col>

            <Col md={6} lg={3}>
              <FooterItem>
                <FooterTitle>Pages</FooterTitle>

                <FooterUl>
                  {routes.map((route) => (
                    <li key={route.name}>
                      {route.path ? (
                        <FooterNavLink
                          exact
                          to={`/${chain.value}${route.path}`}
                        >
                          {route.name}
                        </FooterNavLink>
                      ) : (
                        <Dropdown>
                          <Dropdown.Toggle exact as={FooterButtonNavLink}>
                            {route.name}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {route.paths.map((e) => (
                              <Dropdown.Item
                                key={e.name}
                                as={NavLink}
                                to={`/${chain.value}${e.path}`}
                              >
                                {e.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </li>
                  ))}
                </FooterUl>
              </FooterItem>
            </Col>

            <Col md={6} lg={3}>
              <FooterItem>
                <FooterTitle>Behind Cosmoscan</FooterTitle>

                <FooterUl>
                  {behind.map((link) => (
                    <li key={link.title}>
                      <FooterA
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.title}
                      </FooterA>
                    </li>
                  ))}
                </FooterUl>
              </FooterItem>
            </Col>

            <Col md={6} lg={3}>
              <FooterItem>
                <FooterTitle>Socials</FooterTitle>

                <FooterUl>
                  {socials.map((social) => (
                    <li key={social.title}>
                      <FooterA
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.icon}
                        {social.title}
                      </FooterA>
                    </li>
                  ))}
                </FooterUl>
              </FooterItem>
            </Col>
          </Row>
        </Container>
      </FooterTop>
      <FooterBottom>{`© ${currentYear} All rights reserved`}</FooterBottom>
    </Footer>
  );
};

export default AppFooter;
