import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchForm = styled.form`
  position: relative;
`;

const SearchField = styled(Field)`
  padding: 10px 15px 10px 35px;
  width: 150px;
  border-radius: 25px;
  border: none;
  outline: none;
  background-color: #fff;
  color: black;
  box-shadow: 0 2px 5px darkslategray;
  transition: all .5s;
  
  &:focus {
    width: 350px;
    box-shadow: -2px 2px 5px darkslategray;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: calc(50% - 8px);
`;

let Search = (props) => {
  const { handleSubmit } = props;

  return (
    <SearchForm onSubmit={handleSubmit} autoComplete='off' >
      <SearchField component='input' type='text' name='search' placeholder='search...' />
      <SearchIcon icon={faSearch} color='gray' />
    </SearchForm>
  );
};

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

Search = reduxForm({
  form: 'search'
})(Search);

export default Search;