import * as React from 'react';
import { withRouter } from 'react-router-dom';
import FilterForm from '../FilterForm';
import * as Styles from './styles';

export const normalizeSearchParams = (
  searchParams: URLSearchParams,
  {types, evoLevels}: {types: string[], evoLevels: string[]}
): URLSearchParams => {
  searchParams.set('page', '1');
  types.length ?
    searchParams.set('types', types.toString())
    : searchParams.delete('types');
  evoLevels.length ?
    searchParams.set('evoLevels',  evoLevels.toString())
    : searchParams.delete('evoLevels');
  return searchParams;
};

type FormValues = {
  [key: string]: boolean
};

export const convertToStringArray = (values: FormValues): string[] =>
  Object.entries(values)
    .filter(_ => _[1])
    .map(_ => _[0]);

const Sidebar = (props) => {
  const handleSubmit = (values: {[key: string]: FormValues}): void => {
    const searchParams: URLSearchParams = new URLSearchParams(props.location.search);

    const types: string[] = convertToStringArray(values.types);
    const evoLevels: string[] = convertToStringArray(values.evoLevels);

    const normalizedParams: URLSearchParams  = normalizeSearchParams(searchParams, {types, evoLevels});

    props.history.push(`/?${normalizedParams}`);
  };

  return (
    <Styles.Container>
      <FilterForm onSubmit={handleSubmit} search={props.location.search} />
    </Styles.Container>
  );
};

export default withRouter(Sidebar);