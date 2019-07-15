import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${props => props.theme.backgroundPrimary};
  box-shadow: 0 5px 10px darkslategrey;
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-between;
`;