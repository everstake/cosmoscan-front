import styled from 'styled-components';

export const Green = styled.div`
  color: ${({ theme: { success } }) => success};
`;
export const Burgundy = styled.div`
  color: ${({ theme: { burgundy } }) => burgundy};
`;
export const Red = styled.div`
  color: ${({ theme: { danger } }) => danger};
`;
export const Blue = styled.div`
  color: ${({ theme: { blue } }) => blue};
`;
