import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from './store/index';
import ScrollToTop from './components/ScrollToTop';
import App from './components/App';
import theme from './utils/theme';
import './assets/styles/index.scss';

const wrapper = document.getElementById('root');

render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ScrollToTop>
    </Router>
  </Provider>
  ,
  wrapper
);