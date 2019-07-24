import * as React from 'react';
import * as Styles from './styles';
import CardInfo from '../CardInfo';
import getPokemonPageUrl from '../../utils/pageUrl';

const Card = (props) => {
  const { name, thumb = '#', id, abilities = [], types = [] } = props.data;
  const url = getPokemonPageUrl(id);

  return (
    <Styles.Container>
      <Styles.ThumbWrapper to={url}>
        <Styles.Thumb src={thumb} alt={name} />
      </Styles.ThumbWrapper>
      <CardInfo data={{name, url, abilities, types}}>
      </CardInfo>
    </Styles.Container>
  );
};

export default Card;