import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';

const StyledSwitch = styled.div`
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.value ? 'rgb(2,5,211, 0.1)' : '#E9E9E9')};
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const SwitchButton = styled.div`
  width: 23px;
  height: 23px;
  background-color: ${theme.colors.blueText};
  position: absolute;
  border-radius: 50%;
  transition: left 0.3s;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

const Switch = ({ value, setValue }) => {
  const handleChange = () => {
    setValue(!value);
  };

  return (
    <StyledSwitch onClick={handleChange} value={value}>
      <SwitchButton style={{ left: value ? '31px' : '5px' }} />
    </StyledSwitch>
  );
};

export default Switch;
