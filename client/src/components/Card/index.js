import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';
import CardInfo from '../CardInfo';
import getPokemonPageUrl from '../../utils/pageUrl';

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