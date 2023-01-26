import { createGlobalStyle } from 'styled-components';

import theme, { colors } from './theme';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    color: ${theme.colors.blueText};
    background-color: white;
    letter-spacing: -0.4px; 
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: ${theme.font.weight.regular};
    margin-bottom: 16px;
    color: ${theme.colors.blueText};
  } 
  
  label {
    color: ${theme.colors.blueText};
    font-weight: 300;
    margin-bottom: 5px;
    font-size: 12px;
  }
  
  input {
    width: 100%;
    color: ${theme.colors.blueText};
    border: 1px solid ${theme.colors.stroke};
    height: 39px;
    border-radius: 6px;
    padding: 10px;
    font-size: 14px;
    font-weight: 300;
    outline: none;
  
    &:focus {
      border: 1px solid ${theme.colors.blue};
    }

    &:focus-visible {
      border: 1px solid ${theme.colors.blue};
    }

    &::placeholder {
      color: ${theme.colors.placeholder};
    }
  }
  
  textarea  {
    width: 100%;
    padding: 10px;
    color: ${theme.colors.blueText};
    border: 1px solid ${theme.colors.stroke};
    min-height: 200px;
    font-size: 14px;
    font-weight: 300;
    border-radius: 6px;
  
    &:active {
      border: 1px solid ${theme.colors.blue};
    }
  
    &:focus {
      outline: none;
      border: 1px solid ${theme.colors.blue};
    }

    &::placeholder {
      color: ${theme.colors.placeholder};
    }
  }

  button {
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.blue};
    color: white;
    border-radius: 6px;
    font-size: 14px;
    padding: 10px;
    border: none;
    height: 35px;
  }

  p {
    line-height: 1.8;
    font-size: 14px;
    font-weight: 300;
    margin: 0;
    color: ${colors.blueText};
  }
  
  span {
      font-size: 12px;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      color: ${colors.primary};
    }
    
    transition: 0.2s;
  }
  
  .modal {
    padding-left: 0 !important;
  }  
 
  
  .modal-body {
    
    h5 {
      text-align: center;
    }
  }
  
  .modal-fit-content {
    width: fit-content;
  }

  .modal-fit-content .modal-content {
    width: fit-content;
    padding: 30px;
    margin-top: 100px;
  }
  
  .modal-account {
    max-width: 450px;
  }
  
  .modal-tool {
    height: 100vh;
    width: 100vw;
    margin: 0;
  }
  
  .modal-tool .modal-content {
    height: 100vh;
    width: 100vw;
    border-radius: 0;
  }
  
  .modal-tool .modal-dialog {
    margin: 0;
    padding: 0;
  }
    
`;
