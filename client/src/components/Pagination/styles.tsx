import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  padding: 0;
  justify-content: center;
`;

export const ListItem = styled.li`
  list-style: none;
  color: white;
`;

export const Item = styled.span<{current?: boolean, to?: string, as?: object}>`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 5px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.current ? 'white' : props.theme.backgroundPrimary};
  border: ${props => props.current ? `1px solid ${props.theme.backgroundPrimary}` : 'none' };
  color: ${props => props.current ? props.theme.backgroundPrimary : 'inherit'};
  text-decoration: none;
`;