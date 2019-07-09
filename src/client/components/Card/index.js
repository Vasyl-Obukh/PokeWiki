import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import paths from '../../constants/paths';
import CardInfo from '../CardInfo';

const CardContainer = styled.div`
  margin: 15px;
  width: 230px;
  height: 325px;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 2px 5px darkslategray;
  transition: all .2s;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 10px darkslategray;
  }
`;

const CardThumbWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  background-color: #f0f0f0;
  transition: all .2s;
  
  &:hover {
  background-color: #e0e0e0;
  }
`;

const CardThumb = styled.img`
  height: 100%;
`;

const Index = (props) => {
  const { name, thumb, id, abilities, types } = props.data;
  const url = paths.POKEMON_PAGE.replace(/:\w*$/, id);

  return (
    <CardContainer>
      <CardThumbWrapper href={url}>
        <CardThumb src={thumb} alt={name} />
      </CardThumbWrapper>
      <CardInfo data={{name, url, abilities, types}}>
      </CardInfo>
    </CardContainer>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    thumb: PropTypes.string,
    abilities: PropTypes.array,
    types: PropTypes.array
  })
};

export default Index;