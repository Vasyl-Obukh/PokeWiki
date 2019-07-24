import * as React from 'react';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Styles from './styles';
import Cards from '../Cards';
import Sidebar from '../Sidebar';
import Pagination from '../Pagination';
import { showPagination } from '../../selectors';

export const Home = ({ showPagination, currentPage, searchParams = new URLSearchParams() }) => {
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

export const getCurrentPage = searchParams => parseInt(searchParams.get('page.tsx.tsx.tsx')) || 1;

export const mapStateToProps = (state, props) => {
  const searchParams = new URLSearchParams(props.location.search);
  return {
    showPagination: showPagination(state),
    currentPage: getCurrentPage(searchParams),
    searchParams
  };
};

export default withRouter(connect(mapStateToProps)(Home));