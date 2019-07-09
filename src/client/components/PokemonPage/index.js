import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPage } from '../../actions/page';
import Spinner from '../Spinner';
import Pokemon from '../Pokemon';
import Related from '../Related';
import Error from '../Error';

const ContentWrapper = styled.div`
  padding: 50px 15px;
  height: 100%;
`;

const Main = styled.main`
  padding: 25px 10px;
  border-radius: 25px;
  box-shadow: 0 0 5px darkslategray;
`;

class PokemonPage extends Component {
  static propTypes = {
    fetchPage: PropTypes.func.isRequired,
    data: PropTypes.object,
    relatedData: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool.isRequired,
    relatedIsLoading: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  componentDidMount() {
    this.props.fetchPage(this.props.id);
  }

  render() {
    const { isLoading, data, relatedIsLoading, relatedData, error } = this.props;
    return (
      <ContentWrapper>
        <Main>
          {isLoading && <Spinner/>}
          {error && <Error>{error}</Error>}
          {data && <Pokemon data={data}/>}
          {relatedIsLoading && <Spinner/>}
          {relatedData.length ? <Related data={relatedData} /> : null}
        </Main>
      </ContentWrapper>
    );
  }
}

export default withRouter(
  connect((
    {
       page: {data, isLoading, error},
       related: {isLoading : relatedIsLoading, data: relatedData}
     },
     props
    ) => {
      return {
        id: props.location.pathname.match(/[1-9][0-9]*$/)[0],
        data,
        isLoading,
        relatedIsLoading,
        relatedData,
        error
      };
    },
    dispatch => ({
      fetchPage: id => dispatch(fetchPage(id))
    })
  )(PokemonPage));