import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Title = styled.h3`
  text-align: center;
`;

export const Item = styled.a`
  display: flex;
  padding: 10px 0;
  margin: 15px;
  width: 175px;
  height: 225px;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 0 5px darkslategray;
`;

export const Image = styled.img`
  height: 75%;
`;

export const Name = styled.p`
  font-weight: bold;
  text-transform: uppercase;
`;