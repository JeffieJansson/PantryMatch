import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #f8fdf9 0%, #e8f5e9 100%);
    min-height: 100vh;
    margin: 0;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyles;