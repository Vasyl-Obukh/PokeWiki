import * as React from 'react';
import { reduxForm } from 'redux-form';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Styles from './styles';

let Search = props => {
  const { handleSubmit } = props;

  return (
    <Styles.Form onSubmit={handleSubmit} autoComplete='off' >
      <Styles.StyledField component='input' type='text' name='search' placeholder='search...' />
      <Styles.SearchIcon icon={faSearch} color='gray' />
    </Styles.Form>
  );
};

Search = reduxForm({
  form: 'search'
})(Search);

export default Search;