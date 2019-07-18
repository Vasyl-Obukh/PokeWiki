import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Card  from './index';
import * as Styles from './styles';
import configureStore from 'redux-mock-store';

Enzyme.configure({adapter: new Adapter()});

describe('<Card /> snapshot tests', () => {
  const mockStore = configureStore();
  const initialState = {cards: {data: {}}};
  const store = mockStore(initialState);
  let data;

  beforeEach(() => {
    data = {
      name: 'bulbasaur',
      thumb: '/some/url',
      id: 1,
      abilities: ['ability 1', 'ability 2'],
      types: ['poison', 'grass']
    };
  });

  test('Should render correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Card data={data} />
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should not break if data has not some properties', () => {
    delete data.thumb;
    delete data.abilities;
    delete data.types;

    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Card data={data} />
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Thumb url should be assigned to href attribute in img tag', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <Card data={data} />
        </Router>
      </Provider>
    );
    expect(component.find('img').prop('src')).toBe(data.thumb);
  });

  test('Passed id should be contained in href', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <Card data={data} />
        </Router>
      </Provider>
    );
    expect(component.find(Styles.ThumbWrapper).prop('to')).toContain(data.id);
  });
});