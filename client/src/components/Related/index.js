import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';
import getPokemonPageUrl from '../../utils/pageUrl';

const Related = ({ data = [] }) => {
  return (
      <>
        <Styles.Title>Related pokemons</Styles.Title>
        <Styles.Wrapper>
          {data.map(_ => (
            <Styles.Item key={_.id} href={getPokemonPageUrl(_.id)}>
              <Styles.Image src={_.thumb} alt={_.name} />
              <Styles.Name>{_.name}</Styles.Name>
            </Styles.Item>
          ))}
        </Styles.Wrapper>
      </>
  );
};

Related.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    thumb: PropTypes.string
  }))
};

export default Related;