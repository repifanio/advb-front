import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.main_background};
    font: 400 16px Roboto, sans-serif;
    margin-bottom: 150px;
  }

  .ReactModal__Content{
    height: fit-content;
  }
`;
