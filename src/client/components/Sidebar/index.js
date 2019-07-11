import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FilterForm from '../FilterForm';
import * as Styles from './styles';

export const normalizeSearchParams = (searchParams, {types, evoLevels}) => {
  searchParams.set('page', 1);
  types.length ?
    searchParams.set('types', types)
    : searchParams.delete('types');
  evoLevels.length ?
    searchParams.set('evoLevels',  evoLevels)
    : searchParams.delete('evoLevels');
  return searchParams;
};

export const convertToStringArray = values =>
  Object.entries(values)
    .filter(_ => _[1])
    .map(_ => _[0]);

const Sidebar = (props) => {
  const handleSubmit = values => {
    const searchParams = new URLSearchParams(props.location.search);

    const types = convertToStringArray(values.types);
    const evoLevels = convertToStringArray(values.evoLevels);

    const normalizedParams  = normalizeSearchParams(searchParams, {types, evoLevels});

    props.history.push(`/?${normalizedParams}`);
  };

  return (
    <Styles.Container>
      <FilterForm onSubmit={handleSubmit} search={props.location.search} />
    </Styles.Container>
  );
};

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Sidebar);