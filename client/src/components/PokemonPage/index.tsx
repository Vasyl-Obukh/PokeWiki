import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPage } from '../../actions/page';
import Spinner from '../Spinner';
import Pokemon from '../Pokemon';
import Related from '../Related';
import Error from '../Error';
import * as Styles from './styles';

export class PokemonPage extends React.Component<any, any> {
  componentDidMount() {
    this.props.fetchPage(this.props.id);
  }

  render() {
    const { isLoading, data, relatedIsLoading, relatedData, error } = this.props;
    return (
      <Styles.Wrapper>
        <Styles.Main>
          {isLoading && <Spinner/>}
          {error && <Error>{error}</Error>}
          {data && <Pokemon data={data}/>}
          {relatedIsLoading && <Spinner/>}
          {relatedData.length ? <Related data={relatedData} /> : null}
        </Styles.Main>
      </Styles.Wrapper>
    );
  }
}

export const mapStateToProps = (
  {
    page: {data, isLoading, error},
    related: {isLoading : relatedIsLoading, data: relatedData}
  },
  props
) => {
  return {
    id: Number.parseInt(props.location.pathname.match(/[1-9][0-9]*$/)[0]),
    data,
    isLoading,
    relatedIsLoading,
    relatedData,
    error
  };
};

export const mapDispatchToProps = dispatch => ({
  fetchPage: id => dispatch(fetchPage(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonPage));