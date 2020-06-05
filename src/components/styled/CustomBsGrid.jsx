import styled from 'styled-components';
import { Container as ContainerDefault, Row as RowDefault } from 'react-bootstrap';

export const Row = styled(RowDefault)`
   margin-right: -5px;
   margin-left: -5px;
   
   .col, [class*=col-] {
     padding-right: 5px;
     padding-left: 5px;
   }
`;

export const Container = styled(ContainerDefault)`
  @media (min-width: ${({ theme }) => theme.xlUp}) {
    max-width: 1170px;
  }
`;
