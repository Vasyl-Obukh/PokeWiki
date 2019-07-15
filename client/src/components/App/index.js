import React from 'react';
import { Switch, Route } from 'react-router-dom';
import paths from '../../constants/paths';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import PokemonPage from '../PokemonPage';
import ErrorPage from '../ErrorPage';
import SectionWrapper from '../SectionWrapper';
import ScrollUpButton from '../ScrollUpButton';
import * as Styles from './styles';

const App = () => {
  return (
    <Styles.SiteWrapper>
      <Header />
      <Styles.Content>
        <SectionWrapper>
          <Switch>
            <Route exact path={paths.HOME} component={Home} />
            <Route path={`${paths.POKEMON_PAGE}([1-9][0-9]*)`} component={PokemonPage}/>
            <Route path={paths.ERROR} component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
          <ScrollUpButton />
        </SectionWrapper>
      </Styles.Content>
      <Footer/>
    </Styles.SiteWrapper>
  );
};

export default App;