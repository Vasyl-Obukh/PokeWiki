import React from 'react';
import { Switch, Route } from 'react-router-dom';

import paths from '../../constants/paths';
import Header from '../Header/Header';
import Home from '../Home/Home';
import PokemonPage from '../PokemonPage/PokemonPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import styled from 'styled-components';

const SiteWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  overflow-x: hidden;  
`;

const App = () => {
  return (
    <SiteWrapper>
      <Header />
      <Switch>
        <Route exact path={paths.HOME} component={Home} />
        <Route path={paths.POKEMON_PAGE} component={PokemonPage}/>
        <Route path={paths.ERROR} component={ErrorPage} />
        <Route component={ErrorPage} />
      </Switch>
    </SiteWrapper>

  );
};

export default App;