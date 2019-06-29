import React from 'react';
import styled from 'styled-components';

import SectionWrapper from '../SectionWrapper/SectionWrapper';
import Cards from '../Cards/Cards';
import Sidebar from '../Sidebar/Sidebar';

const StyledMain = styled.main`
`;

const MainWrapper = styled.div`
  display: grid;
  padding: 50px 15px;
  grid-template-columns: 5fr 2fr;
  grid-column-gap: 50px;
`;

const Home = () => {
  return (
    <StyledMain>
      <SectionWrapper>
        <MainWrapper>
          <Cards />
          <Sidebar />
        </MainWrapper>
      </SectionWrapper>
    </StyledMain>
  );
};

export default Home;