import React, { Fragment } from 'react';
import styled from 'styled-components';

const PokemonWrapper = styled.div`
  display: flex;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
`;

const PokemonImage = styled.img`
  width: 275px;
  height: 275px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 0 5px darkslategray;
`;

const PokemonInfo = styled.div`
  display: grid;
  margin-top: 25px;
  grid-template-columns: auto auto;
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  justify-content: center;
`;

const InfoKey = styled.div`
  font-weight: bold;
  text-transform: capitalize;
  text-align: right;
  
  &::after {
    content: ':';
  }
`;
const InfoValue = styled.div`
  font-style: italic;
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  text-transform: ${props => props.primary ? 'uppercase' : 'none'};
`;
const ValueItem = styled.span`
  padding: 5px;
  
  &:not(:first-child) {
    border-left: 1px solid gray;
  }
`;

const Pokemon = ({ data }) => {
  console.log(data);
  return (
    <PokemonWrapper>
      <PokemonImage src={data.thumb} alt={data.name} />
      <PokemonInfo>
        <InfoKey>Name</InfoKey>
        <InfoValue primary>{data.name}</InfoValue>
        <InfoKey>Abilities</InfoKey>
        <InfoValue>{data.abilities.map(_ => <ValueItem key={_}>{_}</ValueItem>)}</InfoValue>
        <InfoKey>Types</InfoKey>
        <InfoValue>{data.types.map(_ => <ValueItem key={_}>{_}</ValueItem>)}</InfoValue>
        <InfoKey>Experience</InfoKey>
        <InfoValue>{data.baseExperience}</InfoValue>
        <InfoKey>Height</InfoKey>
        <InfoValue>{data.height}</InfoValue>
        <InfoKey>Weight</InfoKey>
        <InfoValue>{data.weight}</InfoValue>
        {data.stats.map(_ => (
          <Fragment key={_.name}>
            <InfoKey>{_.name}</InfoKey>
            <InfoValue>{_.base}</InfoValue>
          </Fragment>
        ))}
      </PokemonInfo>
    </PokemonWrapper>
  );
};

export default Pokemon;