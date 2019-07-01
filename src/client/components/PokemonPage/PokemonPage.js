import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPage } from '../../actions/page';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

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
  componentDidMount() {
    this.props.fetchPage(this.props.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.id !== this.props.id) {
      this.props.fetchPage(this.props.id);
    }
  }

  render() {
    console.log(this.props.data);
    const { isLoading, data, error } = this.props;
    return (
      <ContentWrapper>
        <Main>
          {isLoading && <Spinner/>}
          {error && <Error>{error}</Error>}
        </Main>
      </ContentWrapper>
    );
  }
}

export default withRouter(
  connect(
    ({page: {data = {}, isLoading, error}}, props) => {
      return {
        id: props.location.pathname.split('/').slice(-1)[0],
        data,
        isLoading,
        error
      };
    },
    dispatch => ({
      fetchPage: id => dispatch(fetchPage(id))
    })
  )(PokemonPage));