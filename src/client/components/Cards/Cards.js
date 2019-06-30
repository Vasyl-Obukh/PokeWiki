import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
  font-size: 30px;
  animation: ${rotate} 2s linear infinite;
`;

class Cards extends Component {
  componentDidMount() {
    this.props.fetchCards({
      page: this.props.currentPage
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.search !== this.props.search) {
      this.props.fetchCards({
        page: this.props.currentPage
      });
    }
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    elements: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { isLoading, elements = [], error } = this.props;
    if(isLoading) {
      return <Spinner icon={faSpinner} />;
    }
    if(elements.length) {
      return (
        <CardsContainer>
          {elements.map((_) => <Card key={_.id} data={_} />)}
        </CardsContainer>
      );
    }
    if(error) {
      return <CardsError>{error}</CardsError>
    }
    return null;
  }
}

export default withRouter(connect(
  ({
    cards: {
      data = {}, isLoading, error
    }
   }) => ({
    elements: data.elements,
    isLoading,
    error
  }),
  dispatch => ({
    fetchCards: url => dispatch(fetchCards(url))
  })
)(Cards));