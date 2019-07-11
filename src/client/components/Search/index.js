import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Styles from './styles';

let Search = (props) => {
  const { handleSubmit } = props;

  return (
    <Styles.Form onSubmit={handleSubmit} autoComplete='off' >
      <Styles.StyledField component='input' type='text' name='search' placeholder='search...' />
      <Styles.SearchIcon icon={faSearch} color='gray' />
    </Styles.Form>
  );
};

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

Search = reduxForm({
  form: 'search'
})(Search);

export default Search;