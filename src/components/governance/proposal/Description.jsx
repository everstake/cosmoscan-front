import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Accordion } from 'react-bootstrap';
import Card from '../../styled/Card';
import TitleChart from '../../styled/TitleChart';


const AccordionToggle = styled(Accordion.Toggle)`
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  
  ${({ theme: { blue4 } }) => css`
    &:hover {
      background-color: ${blue4};
      border-color: ${blue4};
    }
  `}
`;

const title = 'Proposal description';
const desc = 'Proposal desc long';

const Description = ({ className }) => (
  <Accordion className={className}>
    <Card>
      <Card.Header as={AccordionToggle} eventKey="0">
        <TitleChart>
          { title }
        </TitleChart>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          { desc }
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
);

Description.propTypes = {
  className: PropTypes.string,
};
Description.defaultProps = {
  className: '',
};

export default Description;
