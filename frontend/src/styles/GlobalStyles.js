import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --color-error: #990606;
    --color-title: #222;
    --color-text: #353535;
    --color-green: #1D5334;
    --color-green-light: #2e8b57;
    --color-border: #e6e6e6;
    --color-tag: #e8f5e9;
    --color-label: #555;
    --color-bg: #ffffff;
    --color-button: #22633E;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #f8fdf9 0%, var(--color-tag) 100%);
    min-height: 100vh;
    margin: 0;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-text);
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-title);
    margin: 0 0 0.5em 0;
  }

  p {
    color: var(--color-text);
  }

  .error {
    color: var(--color-error);
  }

  .green {
    color: var(--color-green);
  }
`;

export default GlobalStyles;