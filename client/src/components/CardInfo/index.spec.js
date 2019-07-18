import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CardInfo from './index';
import * as Styles from './styles';
import configureStore from 'redux-mock-store';

Enzyme.configure({adapter: new Adapter()});

describe('<CardInfo /> snapshot tests', () => {
  const mockStore = configureStore();
  const initialState = {cards: {data: {}}};
  const store = mockStore(initialState);
  let data;

  beforeEach(() => {
    data = {
      name: 'bulbasaur',
      url: '/pokemon/1',
      types: ['grass', 'poison'],
      abilities: ['ability 1', 'ability 2']
    };
  });

  test('Should render correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <CardInfo data={data}/>
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should not break if data has not some properties', () => {
    delete data.abilities;
    delete data.types;
    delete data.url;

    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <CardInfo data={data}/>
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Url parameter should be passed to node containing name', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <CardInfo data={data}/>
        </Router>
      </Provider>
    );
    expect(component.find(Styles.Name).prop('to')).toBe(data.url);
  });

  test('Name parameter should be passed to node containing name', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <CardInfo data={data}/>
        </Router>
      </Provider>
    );
    expect(component.find(Styles.Name).text()).toBe(data.name);
  });
});