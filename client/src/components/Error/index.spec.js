import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Error from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('<Error /> test', () => {
  const errorMessage = 'Something goes wrong...';

  test('Should render correctly', () => {
    const component = renderer.create(<Error>{errorMessage}</Error>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text should be passed to Error node', () => {
    const component = mount(<Error>{errorMessage}</Error>);
    expect(component.text()).toBe(errorMessage);
  });
});