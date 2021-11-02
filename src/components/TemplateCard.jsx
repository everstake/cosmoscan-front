import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './styled/Card';
import Flex from './styled/Flex';
import Spinner from './Spinner';
import BreakTxt from './styled/BreakTxt';
import { Container } from './styled/CustomBsGrid';
import TitleMinor from './styled/TitleMinor';

const Row = styled.div`
  display: flex;
  gap: 20px;
`;
const Title = styled.h5`
  margin: 0;
`;
const Text = styled(TitleMinor)`
  min-width: 170px;
`;

const TemplateCard = ({ title, items, isLoading }) => {
  return (
    <Container>
      <Card>
        <Card.Header>
          <Title>{title}</Title>
        </Card.Header>

        {isLoading ? (
          <Flex.Center>
            <Spinner />
          </Flex.Center>
        ) : (
          items.map((e) => {
            return (
              <Card.Body key={e.key}>
                <Row>
                  <Text as="sapn">{e.label}:</Text>
                  <BreakTxt>{e.process ? e.process() : e.value}</BreakTxt>
                </Row>
              </Card.Body>
            );
          })
        )}
      </Card>
    </Container>
  );
};

TemplateCard.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};
TemplateCard.defaultProps = {
  title: '---',
  items: [],
  isLoading: false,
};

export default TemplateCard;
