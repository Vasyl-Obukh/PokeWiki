import React from 'react';
import styled from 'styled-components';

import SectionWrapper from '../SectionWrapper/SectionWrapper';
import Cards from '../Cards/Cards';
import Sidebar from '../Sidebar/Sidebar';

const StyledContent = styled.div`
`;

const ContentWrapper = styled.div`
  display: grid;
  padding: 50px 15px;
  grid-template-columns: 5fr 2fr;
  grid-column-gap: 50px;
`;

const Main = styled.main`
  padding: 25px 10px;
  height: 100%;
  border-radius: 25px;
  box-shadow: 0 0 5px darkslategray;
`;

const Home = () => {
  return (
    <StyledContent>
      <SectionWrapper>
        <ContentWrapper>
          <Main>
            <Cards />
          </Main>
          <Sidebar />
        </ContentWrapper>
      </SectionWrapper>
    </StyledContent>
  );
};

export default Home;