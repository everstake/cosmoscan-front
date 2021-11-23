import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../styled/Card';
import Flex from '../styled/Flex';
import Spinner from './Spinner';
import BreakTxt from '../styled/BreakTxt';
import TitleMinor from '../styled/TitleMinor';
import Subtitle from '../styled/Subtitle';

const Row = styled.div`
  display: flex;
  gap: 15px;
`;
const Label = styled(TitleMinor)`
  min-width: 150px;
`;

const TemplateCard = ({ title, items, isLoading }) => {
  return (
    <Card>
      {!!title && (
        <Card.Header>
          <Subtitle>{title}</Subtitle>
        </Card.Header>
      )}

      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <Flex.Center className="h-100 p-3">
          <Spinner />
        </Flex.Center>
      ) : items && items.length ? (
        items.map((e) => {
          return (
            <Card.Body key={`item-${e.key}`}>
              <Row>
                <Label as="span">{e.label}:</Label>
                <BreakTxt>{e.process ? e.process() : e.value}</BreakTxt>
              </Row>
            </Card.Body>
          );
        })
      ) : (
        <Flex.Center className="p-3">No data</Flex.Center>
      )}
    </Card>
  );
};

TemplateCard.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};
TemplateCard.defaultProps = {
  title: '',
  items: [],
  isLoading: false,
};

export default TemplateCard;
