import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: ${({ theme }) => theme.fs14};
    color: ${({ theme }) => theme.grey2};
    background-color: ${({ theme }) => theme.whiteGrey};
  }
  
  a {
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
    
     &:hover, &.active {
       color: ${({ theme }) => theme.blue};
     }
     
     &:focus {
       outline: ${({ theme }) => theme.blue} auto 1px;;
     }
  }
  
  button:focus, select:focus, option:focus {
    outline: ${({ theme }) => theme.blue} auto 1px;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
  
  ::-moz-selection { /* Code for Firefox */
    background: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }

  ::selection {
    background: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;
