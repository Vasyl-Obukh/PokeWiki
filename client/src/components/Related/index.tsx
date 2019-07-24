import * as React from 'react';
import * as Styles from './styles';
import getPokemonPageUrl from '../../utils/pageUrl';

interface RelatedPokemon {
    id: number,
    name: string,
    thumb: string
}

const Related = ({ data = [] }) => {
  return (
      <>
        <Styles.Title>Related pokemons</Styles.Title>
        <Styles.Wrapper>
          {data.map((_: RelatedPokemon) => (
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