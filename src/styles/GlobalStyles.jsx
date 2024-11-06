import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  
  ${reset} // reset.css 적용
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard';
    background-color: ${({ theme }) => theme.gray[10]}; 
    font-size: ${({ theme }) => theme.typography.body3.fontSize}; 
    color: ${({ theme }) => theme.gray[60]};
    mix-blend-mode: ${(props) => props.theme.mixBlendMode};
  }
 
  div, h1, h2, h3, h4, h5, h6, p, ol, li, a, form, input, button {
    font-family: 'Pretendard';
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.gray[60]};
  }
  
  li {
    list-style: none;
  }
    
  .actor-regular {
    font-family: "Actor", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export default GlobalStyles;
