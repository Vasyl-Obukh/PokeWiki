import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled(FontAwesomeIcon)`
  display: block;
  margin: auto;
  font-size: 30px;
  animation: ${rotate} 2s linear infinite;
`;

const Spinner = () => <StyledSpinner icon={faSpinner} />;

export default Spinner;