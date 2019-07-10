import React from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Styles from './styles';
import Cards from '../Cards';
import Sidebar from '../Sidebar';
import Pagination from '../Pagination';
import { showPagination } from '../../selectors';

export const Home = ({ showPagination, currentPage, searchParams }) => {
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

Home.propTypes = {
  showPagination: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  searchParams: PropTypes.object
};

export const mapStateToProps = (state, props) => {
  const searchParams = new URLSearchParams(props.location.search);
  return {
    showPagination: showPagination(state),
    currentPage: parseInt(searchParams.get('page')) || 1,
    searchParams
  };
};

export default withRouter(connect(mapStateToProps)(Home));