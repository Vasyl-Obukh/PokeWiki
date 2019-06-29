import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchCards } from '../../actions/cards';

import Card from '../Card/Card';

class Cards extends Component {
  componentDidMount() {
    this.props.fetchCards();
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    console.log(this.props);
    const { isLoading, data } = this.props;
    if(isLoading) {
      return <FontAwesomeIcon icon={faSpinner} />;
    }
    if(data.length) {

    }
    return null;
  }
}

export default connect(
  state => ({
    data: state.cards.data,
    isLoading: state.cards.isLoading
  }),
  dispatch => ({
    fetchCards: url => dispatch(fetchCards(url))
  })
)(Cards);