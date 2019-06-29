import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  margin: 15px;
  width: 275px;
  height: 375px;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 2px 5px darkslategray;
  transition: all .2s;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 10px darkslategray;
  }
`;

const CardThumbWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  background-color: #f0f0f0;
`;

const CardThumb = styled.img`
  height: 100%;
`;

const CardInfo = styled.div`
`;

const CardName = styled.div`
  
`;

const Card = (props) => {
  const { name, sprites } = props.data;
  console.log(props);
  return (
    <CardContainer>
      <CardThumbWrapper>
        <CardThumb src={sprites.front_default} alt={name} />
      </CardThumbWrapper>
      <CardInfo>
        <CardName>{name}</CardName>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;