import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchCards } from '../../actions/cards';
import Card from '../Card/Card';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardsError = styled.h2`

`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(FontAwesomeIcon)`
  display: block;
  margin: auto;
  animation: ${rotate} 2s linear infinite;
`;

class Cards extends Component {
  componentDidMount() {
    this.props.fetchCards();
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { isLoading, data, error } = this.props;
    if(isLoading) {
      return <Spinner icon={faSpinner} />;
    }
    if(data.length) {
      return (
        <CardsContainer>
          {data.map((_) => <Card key={_.id} data={_} />)}
        </CardsContainer>
      );
    }
    if(error) {
      return <CardsError>{error}</CardsError>
    }
    return null;
  }
}

export default connect(
  ({
    cards: {
      data, isLoading, error
    }
   }) => ({
    data,
    isLoading,
    error
  }),
  dispatch => ({
    fetchCards: url => dispatch(fetchCards(url))
  })
)(Cards);