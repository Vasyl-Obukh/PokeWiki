import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cards from '../Cards/Cards';
import Sidebar from '../Sidebar/Sidebar';
import Pagination from '../Pagination/Pagination';
import { showPagination } from '../../selectors';

const ContentWrapper = styled.div`
  display: grid;
  padding: 50px 15px;
  height: 100%;
  grid-template-columns: 5fr 2fr;
  grid-column-gap: 50px;
`;

const Main = styled.main`
  padding: 25px 10px;
  border-radius: 25px;
  box-shadow: 0 0 5px darkslategray;
`;

const Home = ({ showPagination, currentPage, searchParams }) => {
  return (
    <ContentWrapper>
      <Main>
        <Cards currentPage={currentPage} searchParams={searchParams}/>
        {showPagination && <Pagination currentPage={currentPage} search={searchParams} />}
      </Main>
      <Sidebar />
    </ContentWrapper>
  );
};

Home.propTypes = {
  showPagination: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  searchParams: PropTypes.object
};

export default withRouter(connect(
  (state, props) => {
    const searchParams = new URLSearchParams(props.location.search);
    return {
      showPagination: showPagination(state),
      currentPage: parseInt(searchParams.get('page')) || 1,
      searchParams
    };
  }
)(Home));