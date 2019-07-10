import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';
import paths from '../../constants/paths';
import CardInfo from '../CardInfo';

export const getPokemonPageUrl = id => paths.POKEMON_PAGE.replace(/:\w*$/, id);

const Card = (props) => {
  const { name, thumb = '#', id, abilities = [], types = [] } = props.data;
  const url = getPokemonPageUrl(id);

  return (
    <Styles.Container>
      <Styles.ThumbWrapper href={url}>
        <Styles.Thumb src={thumb} alt={name} />
      </Styles.ThumbWrapper>
      <CardInfo data={{name, url, abilities, types}}>
      </CardInfo>
    </Styles.Container>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    thumb: PropTypes.string,
    abilities: PropTypes.array,
    types: PropTypes.array
  }).isRequired
};

export default Card;