import React from 'react';
import renderer from 'react-test-renderer';
import Related from './index';

describe('<Related /> tests', () => {
  let props;

  beforeEach(() => {
    props = {
      data: [
        {id: 1, name: 'bulbasaur', thumb: '/some/url/1'},
        {id: 2, name: 'pikachu', thumb: '/some/url/2'}
      ]
    };
  });

  test('Should render correctly with no missing props', () => {
    const component = renderer.create(<Related {...props}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render correctly if non-required props is missing', () => {
    delete props.data[0].thumb;

    const component = renderer.create(<Related {...props}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render correctly if data prop is missing', () => {
    delete props.data;

    const component = renderer.create(<Related {...props}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});