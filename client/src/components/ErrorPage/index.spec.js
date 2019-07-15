import React from 'react';
import renderer from 'react-test-renderer';
import ErrorPage from './index';

describe('<ErrorPage /> tests', () => {
  test('Should render correctly', () => {
    const component = renderer.create(<ErrorPage/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});