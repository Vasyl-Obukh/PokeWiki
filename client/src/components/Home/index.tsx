import * as React from 'react';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Styles from './styles';
import Cards from '../Cards';
import Sidebar from '../Sidebar';
import Pagination from '../Pagination';
import { showPagination } from '../../selectors';
import { State } from '../../store';

type Props = {
  showPagination: boolean,
  currentPage: number,
  searchParams: URLSearchParams
};

export const Home = (props: Props) => {
  const { showPagination, currentPage, searchParams = new URLSearchParams() } = props;

  return (
    <Styles.Wrapper>
      <Styles.Main>
        <Cards currentPage={currentPage} searchParams={searchParams}/>
        {showPagination && <Pagination currentPage={currentPage} search={searchParams} />}
      </Styles.Main>
      <Sidebar />
    </Styles.Wrapper>
  );
};

export const getCurrentPage = (searchParams: URLSearchParams): number =>
  parseInt(searchParams.get('page')) || 1;

export const mapStateToProps = (state: State, ownProps): Props => {
  const searchParams: URLSearchParams = new URLSearchParams(ownProps.location.search);
  return {
    showPagination: showPagination(state),
    currentPage: getCurrentPage(searchParams),
    searchParams
  };
};

export default withRouter(connect(mapStateToProps)(Home));