import styled, { css } from 'styled-components';
import { Pagination } from 'react-bootstrap';

const PaginationStyled = styled(Pagination)`
  ${({ theme: { blue, blue4 } }) => css`
    .page-link {
      color: ${blue};
    }

    .page-item.active .page-link {
      background-color: ${blue};
      border-color: ${blue};
    }

    .page-item.disabled .page-link {
      color: ${blue4};
    }
  `}
`;

export default PaginationStyled;
