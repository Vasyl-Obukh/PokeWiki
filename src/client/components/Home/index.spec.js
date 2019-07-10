import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Home, mapStateToProps } from './index';
import configureStore from 'redux-mock-store';

describe('<Home /> tests', () => {
  const mockStore = configureStore();
  const initialState = {cards: {data: {}}};
  const store = mockStore(initialState);
  let props;

  beforeEach(() => {
    props = {
      currentPage: 1,
      showPagination: true,
      searchParams: new URLSearchParams('types=fire,water')
    };
  });

  test('Should render with pagination', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Home {...props} />
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render without pagination', () => {
    props.showPagination = false;
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Home {...props} />
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<Home /> mapStateToProps() tests', () => {
  let props, state;

  beforeEach(() => {
    state = {cards: {data: {count: 27}, isLoading: false}};
    props = {location: {search: 'page=2&&evoLevels=1,3'}};
  });

  test('Show pagination property of the returned object should be truthly', () => {
    expect(mapStateToProps(state, props)).toEqual({
      showPagination: true,
      currentPage: 2,
      searchParams: new URLSearchParams(props.location.search)
    });
  });

  test('Show pagination property of the returned object should be falsy while loading', () => {
    state.cards.isLoading = true;
    expect(mapStateToProps(state, props)).toEqual({
      showPagination: false,
      currentPage: 2,
      searchParams: new URLSearchParams(props.location.search)
    });
  });

  test('Show pagination property of the returned object should be false if there is less than 2 pages', () => {
    state.cards.data.count = 0;
    expect(mapStateToProps(state, props)).toEqual({
      showPagination: false,
      currentPage: 2,
      searchParams: new URLSearchParams(props.location.search)
    });
  });
});