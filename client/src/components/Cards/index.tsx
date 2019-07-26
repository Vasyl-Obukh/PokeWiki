import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCards } from '../../actions/cards';
import * as Styles from './styles';
import Card from '../Card';
import Error from '../Error';
import Spinner from '../Spinner';
import { State } from '../../store';
import { SearchParams } from '../../global_interfaces/searchParams';
import { PokemonShape } from '../../global_interfaces/pokemon';

type StateProps = {
  search: string,
  elements: PokemonShape[],
  searchParams: SearchParams,
  isLoading: boolean,
  error: string
};

type DispatchProps = {
  fetchCards: (searchParams: SearchParams) => void
};

type Props = StateProps & DispatchProps;

export class Cards extends React.Component<Props, {}> {
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

type OwnProps = {
  searchParams: URLSearchParams,
  [key: string]: any
};

export const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const { cards: {data = {}, isLoading, error} } = state;
  const { searchParams = new URLSearchParams() } = ownProps;
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

export default withRouter(connect<StateProps, DispatchProps, any>(
  mapStateToProps,
  mapDispatchToProps
)(Cards));