import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Accordion } from 'react-bootstrap';
import Linkify from 'react-linkify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../../styled/Card';
import TitleChart from '../../styled/TitleChart';
// import { noString } from '../../../utils';


const AccordionToggle = styled(Accordion.Toggle)`
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  
  ${({ theme: { blue4 } }) => css`
    &:hover {
      background-color: ${blue4};
      border-color: ${blue4};
    }
  `}
`;

const parseParagraphs = (string) => {
  let str = string;
  str = str.replace(/\r\n\r\n/g, '</p><p>').replace(/\n\n/g, '</p><p>');
  str = str.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />');
  return str;
};

const linkify = (text) => ReactDOMServer.renderToStaticMarkup(
  <Linkify
    componentDecorator={(decoratedHref, decoratedText, key) => (
      <a
        target="blank"
        rel="noopener noreferrer"
        href={decoratedHref}
        key={key}
      >
        {decoratedText}
      </a>
    )}
  >
    {text}
  </Linkify>,
);

const Description = ({ title, desc, className }) => {
  const [currEventKey, setCurrEventKey] = useState(null);


  return (
    <Accordion className={className} onSelect={setCurrEventKey}>
      <Card>
        <Card.Header as={AccordionToggle} eventKey="0">
          <TitleChart>
            { title }
          </TitleChart>
          <FontAwesomeIcon
            icon={currEventKey === '0' ? 'chevron-up' : 'chevron-down'}
          />
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div
              dangerouslySetInnerHTML={{ __html: parseParagraphs(linkify(desc)) }}
              className="w-75"
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

Description.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
};
Description.defaultProps = {
  className: '',
  title: 'No title',
  desc: 'No description',
};

export default Description;
