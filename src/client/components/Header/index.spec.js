import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Header from './index';

describe('<Header /> tests', () => {
  test('snapshot test', () => {
    const mockStore = configureStore();
    const initialState = {};
    const store = mockStore(initialState);

    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});