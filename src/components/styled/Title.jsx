import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const MODIFIER_CONFIG = {
  blue: ({ theme: { blue } }) => `
    color: ${blue};
  `,
};

const Title = styled.h2`
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 40px;

  ${applyStyleModifiers(MODIFIER_CONFIG)};
`;

export default Title;
