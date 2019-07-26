import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPage } from '../../actions/page';
import Spinner from '../Spinner';
import Pokemon from '../Pokemon';
import Related from '../Related';
import Error from '../Error';
import * as Styles from './styles';
import {BasicPokemonShape, PokemonShape} from '../../global_interfaces/pokemon';
import { State } from '../../store';

type StateProps = {
  id: number,
  data: PokemonShape,
  isLoading: boolean,
  relatedIsLoading: boolean,
  relatedData: BasicPokemonShape[],
  error: string
};

type DispatchProps = {
  fetchPage: (id: number) => void
};

type Props = StateProps & DispatchProps;

export class PokemonPage extends React.Component<Props, {}> {
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

export const mapStateToProps = (state: State, props): StateProps => {
  const {
    page: {data, isLoading, error},
    related: {isLoading : relatedIsLoading, data: relatedData}
  } = state;

  return {
    id: Number.parseInt(props.location.pathname.match(/[1-9][0-9]*$/)[0]),
    data,
    isLoading,
    relatedIsLoading,
    relatedData,
    error
  };
};

export const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchPage: id => dispatch(fetchPage(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonPage));