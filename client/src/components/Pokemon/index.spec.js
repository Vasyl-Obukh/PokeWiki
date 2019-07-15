import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pokemon from './index';

Enzyme.configure({adapter: new Adapter()});

describe('<Pokemon /> tests', () => {
  let props;

  beforeEach(() => {
    props = {
      data: {
        name: 'pikachu',
        thumb: '/some/url',
        baseExperience: 112,
        height: 5,
        weight: 60,
        types: ['electric'],
        abilities: ['lightning-rod', 'static'],
        stats: [{name: 'hp', base: 35}, {name: 'speed', base: 90}]
      }
    };
  });

  test('Should render correctly with full set of props', () => {
    const component = renderer.create(<Pokemon {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render correctly with missing non-required props', () => {
    delete props.data.thumb;
    delete props.data.baseExperience;
    delete props.data.height;
    delete props.data.weight;

    const component = renderer.create(<Pokemon {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should pass thumb property to img src attribute', () => {
    const component = mount(<Pokemon {...props} />);
    expect(component.find('img').prop('src')).toBe(props.data.thumb);
  });
});