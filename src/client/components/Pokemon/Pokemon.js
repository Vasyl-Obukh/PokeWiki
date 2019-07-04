import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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

const Pokemon = ({ data: {thumb, name, abilities, types, baseExperience, height, weight, stats} }) => {
  return (
    <PokemonWrapper>
      <PokemonImage src={thumb} alt={name} />
      <PokemonInfo>
        <InfoKey>Name</InfoKey>
        <InfoValue primary>{name}</InfoValue>
        <InfoKey>Abilities</InfoKey>
        <InfoValue>{abilities.map(_ => <ValueItem key={_}>{_}</ValueItem>)}</InfoValue>
        <InfoKey>Types</InfoKey>
        <InfoValue>{types.map(_ => <ValueItem key={_}>{_}</ValueItem>)}</InfoValue>
        <InfoKey>Experience</InfoKey>
        <InfoValue>{baseExperience}</InfoValue>
        <InfoKey>Height</InfoKey>
        <InfoValue>{height}</InfoValue>
        <InfoKey>Weight</InfoKey>
        <InfoValue>{weight}</InfoValue>
        {stats.map(_ => (
          <Fragment key={_.name}>
            <InfoKey>{_.name}</InfoKey>
            <InfoValue>{_.base}</InfoValue>
          </Fragment>
        ))}
      </PokemonInfo>
    </PokemonWrapper>
  );
};

Pokemon.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    stats: PropTypes.arrayOf(PropTypes.object).isRequired,
    thumb: PropTypes.string,
    baseExperience: PropTypes.number,
    height: PropTypes.number,
    weight: PropTypes.number
  })
};

export default Pokemon;