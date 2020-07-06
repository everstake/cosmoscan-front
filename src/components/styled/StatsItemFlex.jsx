import styled, { css } from 'styled-components';

const StatsItemFlex = styled.div`
  flex: 1 0 25%;
  text-align: center;
  
  ${({ theme: { lgDown, smDown } }) => css`
    @media(max-width: ${lgDown}) {
      flex: 1 0 50%;
      
      &:first-child, &:nth-child(2) {
        margin-bottom: 10px;
      }
    }
  
    @media(max-width: ${smDown}) {
      flex: 1 0 100%;
      margin-bottom: 10px;
    }
  `}
`;

export default StatsItemFlex;
