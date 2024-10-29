import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  

  ${reset} // reset.css 적용
  
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard-Regular', sans-serif;
    background-color: ${({ theme }) => theme.gray[10]}; 
    font-size: ${({ theme }) => theme.typography.body3.fontSize}; 
    color: ${({ theme }) => theme.gray[60]};
  }

  div, h1, h2, h3, h4, h5, h6, p, ol, li, a, form, input, button {
    font-family: 'Pretendard-Regular', sans-serif;
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
