import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection, Field } from 'redux-form';
import styled from 'styled-components';
import filters from '../../constants/filters';

const StyledForm = styled.form`
  padding: 0 50px;
`;

const StyledFormSection = styled(FormSection)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledLabel = styled.label`
  margin-left: 5px;
`;

const FormButton = styled.button`
  padding: 5px 10px;
  margin-top: 25px;
  width: 100%;
  border-radius: 20px;
  background-color: ${props => props.theme.backgroundPrimary};
  text-transform: capitalize;
  color: white;
  border: none;
  cursor: pointer;
`;

let FilterForm = (props) => {
  const { handleSubmit } = props;

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Filter by:</h2>
      <StyledFormSection name='types'>
        {filters.types.map(_ => (
          <div key={_}>
            <Field component='input' type='checkbox' id={_} key={_} name={_} />
            <StyledLabel htmlFor={_}>{_}</StyledLabel>
          </div>
        ))}
      </StyledFormSection>
      <FormButton type='submit'>filter</FormButton>
    </StyledForm>
  );
};

FilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

FilterForm = reduxForm({
  form: 'filter'
})(FilterForm);

export default FilterForm;