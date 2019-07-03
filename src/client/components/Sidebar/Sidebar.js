import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import FilterForm from '../FilterForm/FilterForm';

const SidebarContainer = styled.aside`
  position: sticky;
  padding: 25px 10px;
  height: 400px;
  border-radius: 25px;
  box-shadow: 0 0 5px darkslategray;
`;

const Sidebar = (props) => {
  const handleSubmit = values => {
    const elements = Object.entries(values.types).filter(_ => _[1]).map(_ => _[0]);
    const elementsQuery = elements.length ? `elements=${elements}` : '';
    const url = `/${elementsQuery ? '?' + elementsQuery : ''}`;
    props.history.push(url);
  };

  const query = new URLSearchParams(props.location.search);
  const elementsString = query.get('elements');
  const elements = elementsString ? elementsString.split(',').map(_ => [_, true]) : [];

  const initialValues = {
    types: Object.fromEntries(elements)
  };

  return (
    <SidebarContainer>
      <FilterForm onSubmit={handleSubmit} initialValues={initialValues} />
    </SidebarContainer>
  );
};

export default withRouter(Sidebar);