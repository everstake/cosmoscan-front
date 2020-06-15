import styled from 'styled-components';
import { Dropdown as Ddwn } from 'react-bootstrap';

const Dropdown = styled(Ddwn)`
  .dropdown-item {
    font-weight: 500;
    padding: .35rem 0.8rem;
    transition: all 0.2s;
  
    &:hover {
      background-color:  ${({ theme }) => theme.whiteGrey4};
    }
  
    &:active, &.active {
      background-color:  ${({ theme }) => theme.whiteGrey4};
      color: ${({ theme }) => theme.blue};
    }
  }
  
  .dropdown-menu {
    font-size: ${({ theme }) => theme.fs14};
    transition: all 0.2s;
    min-width: 75px;
    padding: 0;
  }
`;

export default Dropdown;
