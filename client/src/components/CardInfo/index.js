import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';

const CardInfo = ({ data: { abilities = [], types = [], name, url = '#' } }) => {
  return (
    <Styles.Info>
      <Styles.Name href={url}>{name}</Styles.Name>
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

CardInfo.propTypes = {
  data: PropTypes.shape({
    abilities: PropTypes.arrayOf(PropTypes.string),
    types: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    url: PropTypes.string
  }).isRequired
};

export default CardInfo;