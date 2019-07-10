import React from 'react';
import renderer from 'react-test-renderer';
import CardInfo from './index';

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
});