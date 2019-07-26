import * as React from 'react';
import * as Styles from './styles';
import CardInfo from '../CardInfo';
import getPokemonPageUrl from '../../utils/pageUrl';
import { PokemonShape } from '../../global_interfaces/pokemon';

interface Props {
  data: PokemonShape,
  [key: string]: any
}

const Card = (props: Props) => {
  const { name, thumb = '#', id, abilities = [], types = [] } = props.data;
  const url: string = getPokemonPageUrl(id);

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