import React from 'react';
import renderer from 'react-test-renderer';
import ErrorPage from './index';

describe('<ErrorPage /> tests', () => {
  test('snapshot test', () => {
    const component = renderer.create(<ErrorPage/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});