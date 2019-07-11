import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from './index';

describe('<Spinner /> tests', () => {
  test('Should render correctly', () => {
    const component = renderer.create(<Spinner/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});