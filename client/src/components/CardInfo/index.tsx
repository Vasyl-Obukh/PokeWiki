import * as React from 'react';
import * as Styles from './styles';

const CardInfo = ({ data: { abilities = [], types = [], name, url = '#' } }) => {
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