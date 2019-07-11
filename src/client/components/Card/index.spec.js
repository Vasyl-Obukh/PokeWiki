import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card  from './index';
import * as Styles from './styles';

Enzyme.configure({adapter: new Adapter()});

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

  test('Thumb url should be assigned to href attribute in img tag', () => {
    const component = mount(<Card data={data}/>);
    expect(component.find('img').prop('src')).toBe(data.thumb);
  });

  test('Passed id should be contained in href', () => {
    const component = mount(<Card data={data}/>);
    expect(component.find(Styles.ThumbWrapper).prop('href')).toContain(data.id);
  });
});