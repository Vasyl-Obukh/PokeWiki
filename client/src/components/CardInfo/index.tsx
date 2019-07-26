import * as React from 'react';
import * as Styles from './styles';

interface InfoData {
  name: string,
  url: string,
  types: string[],
  abilities: string[]
}

interface Props {
  data: InfoData,
  [key: string]: any
}

const CardInfo = (props: Props) => {
  const { abilities = [], types = [], name, url = '#' } = props.data;
  return (
    <Styles.Info>
      <Styles.Name to={url}>{name}</Styles.Name>
      <Styles.Entry>
        <Styles.Key>Abilities</Styles.Key>
        <Styles.Values>
          {abilities.map((_, id) => <Styles.Value key={id}>{_}</Styles.Value>)}
        </Styles.Values>
      </Styles.Entry>
      <Styles.Entry>
        <Styles.Key>Types</Styles.Key>
        <Styles.Values>
          {types.map((_, id) => <Styles.Value key={id}>{_}</Styles.Value>)}
        </Styles.Values>
      </Styles.Entry>
    </Styles.Info>
  );
};

export default CardInfo;