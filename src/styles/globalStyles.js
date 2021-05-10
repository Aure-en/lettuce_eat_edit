import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'IBM Plex Sans', 'Noto Sans JP', 'IBM Plex Mono', sans-serif;
    font-size: .875rem;
    background: ${({ theme }) => theme.bg_app};
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.25rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: 'IBM Plex Sans', 'Noto Sans JP', 'IBM Plex Mono', sans-serif;

    &:focus {
      outline: 1px solid transparent;
    }
  }
`;

export default GlobalStyles;
