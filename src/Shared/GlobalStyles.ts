import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    min-width: 320px;
    scroll-behavior: smooth;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    font-family: "Vazirmatn", Inter, Tahoma, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.7;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.2s ease, color 0.2s ease;
    -webkit-font-smoothing: antialiased;
  }

  button, input, textarea, select {
    font: inherit;
    letter-spacing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Vazirmatn", Inter, Tahoma, sans-serif;
    line-height: 1.5;
    font-weight: 700;
  }

  input, textarea, select {
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  #root {
    min-height: 100vh;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }
`

export default GlobalStyles
