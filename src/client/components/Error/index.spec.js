import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Error from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('<Error /> test', () => {
  const errorMessage = 'Something goes wrong...';

  test('text passing test', () => {
    const component = mount(<Error>{errorMessage}</Error>);
    expect(component.text()).toBe(errorMessage);
  });

  test('snapshot test', () => {
    const component = renderer.create(<Error>{errorMessage}</Error>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});