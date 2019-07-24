import * as React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.h1`
  margin-top: 100px;
  color: red;
  text-align: center;
`;

const ErrorPage = () => <ErrorMessage>Error Page</ErrorMessage>;

export default ErrorPage;