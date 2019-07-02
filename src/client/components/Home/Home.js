import React from 'react';
import styled from 'styled-components';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Cards from '../Cards/Cards';
import Sidebar from '../Sidebar/Sidebar';
import Pagination from '../Pagination/Pagination';

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

const Home = ({ showPagination, currentPage, search, searchParams }) => {
  return (
    <ContentWrapper>
      <Main>
        <Cards currentPage={currentPage} search={search} searchParams={searchParams}/>
        {showPagination && !searchParams.has('search') && <Pagination currentPage={currentPage} search={search} />}
      </Main>
      <Sidebar />
    </ContentWrapper>
  );
};

export default withRouter(connect(
  (state, props) => {
    const search = new URLSearchParams(props.location.search);
    return {
      showPagination: state.cards.data && Math.ceil(state.cards.data.count / 18) > 1 && !state.cards.isLoading,
      currentPage: parseInt(search.get('page')) || 1,
      search: search.toString(),
      searchParams: search
    };
  }
)(Home));