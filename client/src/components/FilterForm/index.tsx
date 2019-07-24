import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
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
            <Field component='input' type='checkbox' id={_ + ''} name={_ + ''} />
            <Styles.Label htmlFor={_ + ''}>{_}</Styles.Label>
          </div>
        ))}
      </Styles.StyledFormSection>
      <Styles.FormButton type='submit'>filter</Styles.FormButton>
    </Styles.Form>
  );
};

FilterForm = reduxForm({
  form: 'filter'
})(FilterForm);

export const mapStateToProps = (state, props) => {
  const query = new URLSearchParams(props.search);
  const typesString = query.get('types');
  const evoLevelsString = query.get('evoLevels');
  const types = typesString ?
    typesString.split(',').map(_ => [_, true])
    : [];
  const evoLevels = evoLevelsString ?
    evoLevelsString.split(',').map(_ => [_, true])
    : [];

  return {
    initialValues: {
      types: Object.fromEntries(types),
      evoLevels: Object.fromEntries(evoLevels)
    }
  };
};

export default connect(
  mapStateToProps
)(FilterForm);