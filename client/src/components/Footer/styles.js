import styled from 'styled-components';

export const Container = styled.footer`
  background-color: ${props => props.theme.backgroundPrimary};
`;

export const Wrapper = styled.div`
  padding: 25px;
`;

export const Copyright = styled.p`
  text-align: center;
  color: ${props => props.theme.colorSecondary}
`;