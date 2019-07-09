import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import paths from '../../constants/paths';

const RelatedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RelatedTitle = styled.h3`
  text-align: center;
`;

const RelatedItem = styled.a`
  display: flex;
  padding: 10px 0;
  margin: 15px;
  width: 175px;
  height: 225px;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 0 5px darkslategray;
`;

const RelatedImage = styled.img`
  height: 75%;
`;

const RelatedName = styled.p`
  font-weight: bold;
  text-transform: uppercase;
`;

const Related = ({ data }) => {
  return (
      <>
        <RelatedTitle>Related pokemons</RelatedTitle>
        <RelatedWrapper>
          {data.map(_ => (
            <RelatedItem key={_.id} href={paths.POKEMON_PAGE.replace(/:\w*$/, _.id)}>
              <RelatedImage src={_.thumb} alt={_.name} />
              <RelatedName>{_.name}</RelatedName>
            </RelatedItem>
          ))}
        </RelatedWrapper>
      </>
  );
};

Related.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    thumb: PropTypes.string
  }))
};

export default Related;