import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCards } from '../../actions/cards';
import Card from '../Card/Card';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Cards extends Component {
  componentDidMount() {
    this.props.fetchCards(this.props.searchParams);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.search !== this.props.search) {
      this.props.fetchCards(this.props.searchParams);
    }
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    elements: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string
  };

  render() {
    const { isLoading, elements = [], error } = this.props;
    if (isLoading) {
      return <Spinner />;
    }
    if (elements.length) {
      return (
        <CardsContainer>
          {elements.map((_) => _.id && <Card key={_.id} data={_} />)}
        </CardsContainer>
      );
    }
    if(error) {
      return <Error>{error}</Error>
    }
    return null;
  }
}

export default withRouter(connect(
  ({cards: {data = {}, isLoading, error}}, {searchParams}) => {
    const evoLevels = searchParams.get('evoLevels');
    const types = searchParams.get('types');

    return {
      searchParams: {
        page: parseInt(searchParams.get('page')) || 1,
        evoLevels: evoLevels ? evoLevels : [],
        types: types ? types : [],
        search: searchParams.get('search')
      },
      elements: data.elements,
      isLoading,
      error
    };
  },
  dispatch => ({
    fetchCards: searchParams => dispatch(fetchCards(searchParams))
  })
)(Cards));