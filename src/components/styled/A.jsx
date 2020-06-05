import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';


const MODIFIER_CONFIG = {
  uppercase: () => `
    text-transform: uppercase;
  `,
};

const A = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
  
  &:hover {
    color: ${({ theme }) => theme.violet};
  }
  
   ${applyStyleModifiers(MODIFIER_CONFIG)};
`;

export default A;
