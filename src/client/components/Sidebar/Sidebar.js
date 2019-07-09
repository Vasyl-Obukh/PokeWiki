import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import FilterForm from '../FilterForm/FilterForm';

const SidebarContainer = styled.aside`
  position: sticky;
  padding: 25px 10px;
  height: 500px;
  border-radius: 25px;
  box-shadow: 0 0 5px darkslategray;
`;

const Sidebar = (props) => {
  const handleSubmit = values => {
    const searchParams = new URLSearchParams(props.location.search);
    const convertToStringArray = values =>
      Object.entries(values)
        .filter(_ => _[1])
        .map(_ => _[0]);

    const types = convertToStringArray(values.types)
    const evoLevels = convertToStringArray(values.evoLevels);

    searchParams.set('page', 1);
    types.length ?
      searchParams.set('types', types)
      : searchParams.delete('types');
    evoLevels.length ?
      searchParams.set('evoLevels',  evoLevels)
      : searchParams.delete('evoLevels');

    props.history.push(`/?${searchParams}`);
  };

  const query = new URLSearchParams(props.location.search);
  const typesString = query.get('types');
  const evoLevelsString = query.get('evoLevels');
  const types = typesString ?
    typesString.split(',').map(_ => [_, true])
    : [];
  const evoLevels = evoLevelsString ?
    evoLevelsString.split(',').map(_ => [_, true])
    : [];

  const initialValues = {
    types: Object.fromEntries(types),
    evoLevels: Object.fromEntries(evoLevels)
  };

  return (
    <SidebarContainer>
      <FilterForm onSubmit={handleSubmit} initialValues={initialValues} />
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Sidebar);