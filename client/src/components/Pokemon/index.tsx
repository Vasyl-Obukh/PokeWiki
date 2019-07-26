import * as React from 'react';
import * as Styles from './styles';
import { PokemonShape } from '../../global_interfaces/pokemon';

type Props = {
  data: PokemonShape
};

const Pokemon = (props: Props) => {
  const {thumb = '#', name, abilities, types, baseExperience, height, weight, stats} = props.data;

  return (
    <Styles.Wrapper>
      <Styles.Image src={thumb} alt={name} />
      {name && <Styles.Info>
        <Styles.InfoKey>Name</Styles.InfoKey>
        <Styles.InfoValue primary={true}>{name}</Styles.InfoValue>
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
          <React.Fragment key={_.name}>
            <Styles.InfoKey>{_.name}</Styles.InfoKey>
            <Styles.InfoValue>{_.base}</Styles.InfoValue>
          </React.Fragment>
        ))}
      </Styles.Info>}
    </Styles.Wrapper>
  );
};

export default Pokemon;