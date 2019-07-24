import styled from 'styled-components';

const Error = styled.h2`
  padding-left: 25px;
  
  &::after {
    content: '!!!';
    padding-left: 5px;
    color: red;
  }
`;

export default Error;