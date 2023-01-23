import React from 'react';
import styled from 'styled-components';
import BootstrapSpinner from 'react-bootstrap/Spinner';

const StyledSpinner = styled(BootstrapSpinner)`
  margin-left: 20px;
`;

const Spinner = () => {
  return (
    <StyledSpinner animation="border" role="status" size={'sm'}>
      <span className="visually-hidden">Loading...</span>
    </StyledSpinner>
  );
};

export default Spinner;
