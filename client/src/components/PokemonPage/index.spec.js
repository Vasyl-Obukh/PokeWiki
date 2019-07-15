import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PokemonPage, mapStateToProps, mapDispatchToProps } from './index';
import { PAGE_REQUESTED } from '../../constants/actionTypes';
import paths from '../../constants/paths';

describe('<PokemonPage /> tests', () => {
  const mockStore = configureStore();
  const initialState = {};
  const store = mockStore(initialState);
  let props;

  beforeEach(() => {
    props = {
      fetchPage: jest.fn(),
      data: {
        name: 'pikachu',
        types: ['electric'],
        abilities: ['lightning-rod', 'static'],
        stats: [{name: 'hp', base: 35}, {name: 'speed', base: 90}]
      },
      relatedData: [],
      isLoading: false,
      relatedIsLoading: false,
      error: undefined
    };
  });

  test('Should render spinner for main content', () => {
    props.isLoading = true;

    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <PokemonPage {...props}/>
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render spinner for related content', () => {
    props.relatedIsLoading = true;

    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <PokemonPage {...props}/>
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render error message block', () => {
    props.error = 'Something goes wrong...';

    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <PokemonPage {...props}/>
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render related block', () => {
    props.relatedData = [
      {id: 1, name: 'bulbasaur'}
    ];

    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <PokemonPage {...props}/>
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should invoke fetchPage only once', () => {
    renderer.create(<PokemonPage {...props}/>);
    expect(props.fetchPage.mock.calls.length).toBe(1);
  });
});

describe('<PokemonPage /> connect functions tests', () => {
  let props, state;

  beforeEach(() => {
    state = {
      page: {data: {}, isLoading: false, error: undefined},
      related: {isLoading: false, data: []}
    };
    props = {
      location: {pathname: '/pokemon/34'}
    };
  });

  test('mapStateToProps() should work correctly', () => {
    expect(mapStateToProps(state, props)).toEqual({
      id: 34,
      data: {},
      isLoading: false,
      relatedIsLoading: false,
      relatedData: [],
      error: undefined
    });
  });

  test('mapDispatchToProps() should return correct action object', () => {
    const dispatch = jest.fn();
    const id = 7;

    mapDispatchToProps(dispatch).fetchPage(id);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: PAGE_REQUESTED,
      url: `${paths.API_ROOT}/pokemon/7`
    });
  });
});