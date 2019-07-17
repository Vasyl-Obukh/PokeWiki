import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Info = styled.div`
  padding: 10px 10px 0;
  color: #333;
`;

export const Name = styled(Link)`
  display: block;
  margin: 0;
  font-size: 18px;
  color: #333;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  transition: all .2s;
  
  &:hover {
    color: #777;
  }
`;

export const Entry = styled.div`
  margin: 5px 0;
  text-align: center;
  color: #444;
`;

export const Key = styled.div`
  font-weight: bold;
  &::after {
    content: ':';
  }
`;

export const Values = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

export const Value = styled.li`
  list-style: none;
  padding: 5px 10px;
  font-size: 14px;
  
  &:not(:last-child) {
    border-right: 2px solid lightgray;
  }
`;