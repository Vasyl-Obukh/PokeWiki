import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Sidebar, { normalizeSearchParams, convertToStringArray } from './index';

describe('<Sidebar /> tests', () => {
  const mockStore = configureStore();
  const initialState = {};
  const store = mockStore(initialState);
  let props;

  beforeEach(() => {
    props = {search: {location: {search: 'page=2&&types=normal,fire'}}};
  });

  test('Should render correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Sidebar {...props}/>
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('normalizeSearchParams() tests', () => {

  test('Should change all keys', () => {
    const searchParams = new URLSearchParams('page=3&&types=fire&&evoLevels=2');
    const update = {
      types: ['water'],
      evoLevels: [1, 3]
    };
    expect(normalizeSearchParams(searchParams, update))
      .toEqual(new URLSearchParams('page=1&&types=water&&evoLevels=1,3'));
  });

  test('Should delete all keys except page', () => {
    const searchParams = new URLSearchParams('page=3&&types=fire&&evoLevels=2');
    const update = {
      types: [],
      evoLevels: []
    };
    expect(normalizeSearchParams(searchParams, update))
      .toEqual(new URLSearchParams('page=1'));
  });
});

describe('convertToStringArray() tests', () => {
  test('Should work correctly', () => {
    const values = {fire: true, electric: false, normal: true};
    expect(convertToStringArray(values)).toEqual(['fire', 'normal']);
  });
});