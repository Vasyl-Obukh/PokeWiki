import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCards } from '../../actions/cards';
import * as Styles from './styles';
import Card from '../Card';
import Error from '../Error';
import Spinner from '../Spinner';

export class Cards extends Component {
  componentDidMount() {
    const { elements, isLoading, error } = this.props;
    if (!elements.length && !isLoading && !error ) {
      this.props.fetchCards(this.props.searchParams);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.props.fetchCards(this.props.searchParams);
    }
  }

  static defaultProps = {
    elements: []
  };

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
        <Styles.Container>
          {elements.map((_) => <Card key={_.id} data={_} />)}
        </Styles.Container>
      );
    }
    if (error) {
      return <Error>{error}</Error>
    }
    return null;
  }
}

export const mapStateToProps = (
  { cards: {data = {}, isLoading, error} },
  { searchParams = new URLSearchParams() }
) => {
  const evoLevels = searchParams.get('evoLevels');
  const types = searchParams.get('types');

  return {
    searchParams: {
      page: parseInt(searchParams.get('page')) || 1,
      evoLevels: evoLevels ? evoLevels.split(',').map(_ => Number.parseInt(_)) : [],
      types: types ? types.split(',') : [],
      search: searchParams.get('search')
    },
    search: searchParams.toString(),
    elements: data.elements || [],
    isLoading,
    error
  };
};

export const mapDispatchToProps = dispatch => ({
  fetchCards: searchParams => dispatch(fetchCards(searchParams))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards));