import styled from 'styled-components';
import { Dropdown as Ddwn } from 'react-bootstrap';

const Dropdown = styled(Ddwn)`
  .dropdown-item {
    font-weight: 500;
    padding: .25rem 0.8rem;
  
    &:active, &.active {
      background-color: transparent;
      color: ${({ theme }) => theme.blue};
    }
  }
  
  .dropdown-menu {
    font-size: ${({ theme }) => theme.fs14};
    transition: all 0.2s;
    min-width: 100px;
    padding: .4rem 0;
  }
`;

export default Dropdown;
