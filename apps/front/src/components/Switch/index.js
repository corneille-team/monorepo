import React from 'react';
import ReactSwitch from 'react-switch';

import theme from '../../styles/theme';

const Switch = ({ value, setValue }) => {
  return (
    <ReactSwitch
      onChange={setValue}
      checked={value}
      offColor={theme.colors.grayDark}
      onColor={theme.colors.blue}
    />
  );
};

export default Switch;
