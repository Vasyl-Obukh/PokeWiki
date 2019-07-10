import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px;
  width: 230px;
  height: 325px;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 2px 5px darkslategray;
  transition: all .2s;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 10px darkslategray;
  }
`;

export const ThumbWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  background-color: #f0f0f0;
  transition: all .2s;
  
  &:hover {
  background-color: #e0e0e0;
  }
`;

export const Thumb = styled.img`
  height: 100%;
`;