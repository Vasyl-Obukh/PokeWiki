import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardInfo from './index';
import * as Styles from './styles';

Enzyme.configure({adapter: new Adapter()});

describe('<CardInfo /> snapshot tests', () => {
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
    const component = renderer.create(<CardInfo data={data}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should not break if data has not some properties', () => {
    delete data.abilities;
    delete data.types;
    delete data.url;

    const component = renderer.create(<CardInfo data={data}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Url parameter should be passed to node containing name', () => {
    const component = mount(<CardInfo data={data}/>);
    expect(component.find(Styles.Name).prop('href')).toBe(data.url);
  });

  test('Name parameter should be passed to node containing name', () => {
    const component = mount(<CardInfo data={data}/>);
    expect(component.find(Styles.Name).text()).toBe(data.name);
  });
});