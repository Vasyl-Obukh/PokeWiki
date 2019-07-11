import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Pagination, mapStateToProps } from './index';

Enzyme.configure({adapter: new Adapter()});

describe('<Pagination /> tests', () => {
  const mockStore = configureStore();
  const initialState = {};
  const store = mockStore(initialState);
  let props;

  beforeEach(() => {
    props = {
      pagesAmount: 8,
      currentPage: 4,
      search: new URLSearchParams('types=fire,steel&&evoLevels=1,3')
    };
  });

  test('Should render correctly with full set of props', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Pagination {...props} />
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render null if pages amount less than 2', () => {
    props.pagesAmount = 1;

    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Pagination {...props} />
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render arrows on both sides', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <Pagination {...props} />
        </Router>
      </Provider>
    );
    expect(component.find('svg[data-icon="chevron-left"]')).toHaveLength(1);
    expect(component.find('svg[data-icon="chevron-right"]')).toHaveLength(1);
  });

  test('Should render arrows only on the left side', () => {
    props.currentPage = props.pagesAmount;

    const component = mount(
      <Provider store={store}>
        <Router>
          <Pagination {...props} />
        </Router>
      </Provider>
    );
    expect(component.find('svg[data-icon="chevron-left"]')).toHaveLength(1);
    expect(component.find('svg[data-icon="chevron-right"]')).toHaveLength(0);
  });

  test('Should render arrows only on the right side', () => {
    props.currentPage = 1;

    const component = mount(
      <Provider store={store}>
        <Router>
          <Pagination {...props} />
        </Router>
      </Provider>
    );
    expect(component.find('svg[data-icon="chevron-left"]')).toHaveLength(0);
    expect(component.find('svg[data-icon="chevron-right"]')).toHaveLength(1);
  });

  test('mapStateToProps should return object with correct pagesAmount property', () => {
    const state = {cards: {data: {count: 32}}};
    expect(mapStateToProps(state)).toEqual({pagesAmount: 2});
  });
});