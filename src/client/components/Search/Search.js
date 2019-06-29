import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchForm = styled.form`
  position: relative;
`;

const SearchField = styled.input`
  padding: 10px 15px 10px 35px;
  width: 150px;
  border-radius: 25px;
  border: none;
  outline: none;
  background-color: #f7f7f7;
  color: black;
  transition: all .5s;
  
  &:focus {
    width: 350px;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: calc(50% - 8px);
`;

const Search = () => {
  const handleSubmit = () => console.log('form submitted');
  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchField type='text' placeholder='search...' />
      <SearchIcon icon={faSearch} color={'gray'}/>
    </SearchForm>
  );
};

export default Search;