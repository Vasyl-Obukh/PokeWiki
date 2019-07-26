import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as Styles from './styles';
import filters from '../../constants/filters';
import { State } from '../../store';

const FilterForm = (props) => {
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

type DefaultValue = {
  [key: string]: boolean
};

type InitialValues = {
  types: DefaultValue,
  evoLevels: DefaultValue
};

type OwnProps = {
  search: URLSearchParams | string
}

type StateProps = {
  initialValues: InitialValues
};

export const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const query: URLSearchParams = new URLSearchParams(ownProps.search);
  const typesString: string = query.get('types');
  const evoLevelsString: string = query.get('evoLevels');
  const types: (string | boolean)[][] = typesString ?
    typesString.split(',').map(_ => [_, true])
    : [];
  const evoLevels: (string | boolean)[][] = evoLevelsString ?
    evoLevelsString.split(',').map(_ => [_, true])
    : [];

  return {
    initialValues: {
      types: Object.fromEntries(types),
      evoLevels: Object.fromEntries(evoLevels)
    }
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'filter'
})(FilterForm));