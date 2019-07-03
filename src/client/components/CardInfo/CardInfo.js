import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Info = styled.div`
  padding: 10px 10px 0;
  color: #333;
`;

const CardName = styled.a`
  display: block;
  margin: 0;
  font-size: 18px;
  color: #333;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  transition: all .2s;
  
  &:hover {
    color: #777;
  }
`;

const CardEntry = styled.div`
  margin: 5px 0;
  text-align: center;
  color: #444;
`;

const CardKey = styled.div`
  font-weight: bold;
  &::after {
    content: ':';
  }
`;

const CardValues = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

const CardValue = styled.li`
  list-style: none;
  padding: 5px 10px;
  font-size: 14px;
  
  &:not(:last-child) {
    border-right: 2px solid lightgray;
  }
`;

const CardInfo = ({ abilities, types, name, url }) => {
  return (
    <Info>
      <CardName href={url}>{name}</CardName>
      <CardEntry>
        <CardKey>Abilities</CardKey>
        <CardValues>
          {abilities.map((_, id) => <CardValue key={id}>{_}</CardValue>)}
        </CardValues>
      </CardEntry>
      <CardEntry>
        <CardKey>Types</CardKey>
        <CardValues>
          {types.map((_, id) => <CardValue key={id}>{_}</CardValue>)}
        </CardValues>
      </CardEntry>
    </Info>
  );
};

CardInfo.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.string),
  types: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default CardInfo;