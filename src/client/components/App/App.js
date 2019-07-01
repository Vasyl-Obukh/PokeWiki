import React from 'react';
import { Switch, Route } from 'react-router-dom';

import paths from '../../constants/paths';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import PokemonPage from '../PokemonPage/PokemonPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import styled from 'styled-components';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

const SiteWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  overflow-x: hidden;  
`;

const StyledContent = styled.div`
  height: 100%;
`;

const App = () => {
  return (
    <SiteWrapper>
      <Header />
      <StyledContent>
        <SectionWrapper>
          <Switch>
            <Route exact path={paths.HOME} component={Home} />
            <Route path={`${paths.POKEMON_PAGE}([1-9][0-9]{0,})`} component={PokemonPage}/>
            <Route path={paths.ERROR} component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </SectionWrapper>
      </StyledContent>

      <Footer/>
    </SiteWrapper>

  );
};

export default App;