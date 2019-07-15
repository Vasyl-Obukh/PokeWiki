import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';

const Pokemon = ({ data: {thumb = '#', name, abilities, types, baseExperience, height, weight, stats} }) => {
  return (
    <Styles.Wrapper>
      <Styles.Image src={thumb} alt={name} />
      {name && <Styles.Info>
        <Styles.InfoKey>Name</Styles.InfoKey>
        <Styles.InfoValue primary>{name}</Styles.InfoValue>
        <Styles.InfoKey>Abilities</Styles.InfoKey>
        <Styles.InfoValue>{abilities.map(_ => <Styles.ValueItem key={_}>{_}</Styles.ValueItem>)}</Styles.InfoValue>
        <Styles.InfoKey>Types</Styles.InfoKey>
        <Styles.InfoValue>{types.map(_ => <Styles.ValueItem key={_}>{_}</Styles.ValueItem>)}</Styles.InfoValue>
        <Styles.InfoKey>Experience</Styles.InfoKey>
        <Styles.InfoValue>{baseExperience}</Styles.InfoValue>
        <Styles.InfoKey>Height</Styles.InfoKey>
        <Styles.InfoValue>{height}</Styles.InfoValue>
        <Styles.InfoKey>Weight</Styles.InfoKey>
        <Styles.InfoValue>{weight}</Styles.InfoValue>
        {stats.map(_ => (
          <Fragment key={_.name}>
            <Styles.InfoKey>{_.name}</Styles.InfoKey>
            <Styles.InfoValue>{_.base}</Styles.InfoValue>
          </Fragment>
        ))}
      </Styles.Info>}
    </Styles.Wrapper>
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