import * as React from 'react';
import * as Styles from './styles';
import getPokemonPageUrl from '../../utils/pageUrl';
import { BasicPokemonShape } from '../../global_interfaces/pokemon';

type Props = {
  data: BasicPokemonShape[]
}

const Related = (props: Props) => {
  const { data = [] } = props;

  return (
      <>
        <Styles.Title>Related pokemons</Styles.Title>
        <Styles.Wrapper>
          {data.map((_) => (
            <Styles.Item key={_.id} href={getPokemonPageUrl(_.id)}>
              <Styles.Image src={_.thumb} alt={_.name} />
              <Styles.Name>{_.name}</Styles.Name>
            </Styles.Item>
          ))}
        </Styles.Wrapper>
      </>
  );
};

export default Related;