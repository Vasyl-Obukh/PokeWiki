import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection, Field } from 'redux-form';
import * as Styles from './styles';
import filters from '../../constants/filters';

let FilterForm = (props) => {
  const { handleSubmit } = props;

  return (
    <Styles.Form onSubmit={handleSubmit}>
      <h2>Filter by:</h2>
      <h3>Types</h3>
      <Styles.StyledFormSection name='types'>
        {filters.types.map(_ => (
          <div key={_}>
            <Field component='input' type='checkbox' id={_} name={_} />
            <Styles.Label htmlFor={_}>{_}</Styles.Label>
          </div>
        ))}
      </Styles.StyledFormSection>
      <h3>Evolution levels</h3>
      <Styles.StyledFormSection name='evoLevels'>
        {filters.evoLevels.map(_ => (
          <div key={_}>
            <Field component='input' type='checkbox' id={_} name={_ + ''} />
            <Styles.Label htmlFor={_}>{_}</Styles.Label>
          </div>
        ))}
      </Styles.StyledFormSection>
      <Styles.FormButton type='submit'>filter</Styles.FormButton>
    </Styles.Form>
  );
};

FilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

FilterForm = reduxForm({
  form: 'filter'
})(FilterForm);

export default FilterForm;