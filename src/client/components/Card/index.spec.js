import React from 'react';
import renderer from 'react-test-renderer';
import Card, { getPokemonPageUrl } from './index';

describe('<Card /> snapshot tests', () => {
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
    const component = renderer.create(<Card data={data} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should not break if data has not some properties', () => {
    delete data.thumb;
    delete data.abilities;
    delete data.types;

    const component = renderer.create(<Card data={data} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<Card /> helper functions tests', () => {
  test('getPokemonPageUrl() test', () => {
    const id = 7;
    expect(getPokemonPageUrl(id)).toBe('/pokemon/7');
  });
});