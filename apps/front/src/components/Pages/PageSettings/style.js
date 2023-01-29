import styled, { keyframes } from 'styled-components';

import theme from '../../../styles/theme';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: auto;
  row-gap: 20px;
`;

const Section = styled.div`
  border: 1px solid ${theme.colors.stroke};
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 20px;

  p {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  column-gap: 20px;

  div {
    width: 100%;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; visibility: hidden; display: none; }
  to { opacity: 1; visibility: visible; display: block; }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
`;

const Button = styled.button`
  height: 45px;
  font-size: 14px;
  padding: 12px 24px;
  background-color: ${theme.colors.blueText};
  margin: 20px 0 0 auto;

  animation: ${(props) => (props.condition ? fadeIn : fadeOut)} 0.5s ease-in-out;
  animation-fill-mode: forwards;
  visibility: ${(props) => (props.condition ? 'visible' : 'hidden')};
  display: ${(props) => (props.condition ? 'block' : 'none')};
`;

export default {
  CenteredContainer,
  Section,
  Row,
  Button,
};
