import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { theme } from './theme.jsx';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Actor&display=swap');

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
    background-color: ${theme.colors.background}; 
    font-size: ${theme.typography.bodyFontSize}; 
    color: ${theme.colors.text};
  }

  a {
    text-decoration: none;
    color: ${theme.gray[60]};
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
