import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Related from './index';
import * as Styles from './styles';

Enzyme.configure({adapter: new Adapter()});

describe('<Related /> tests', () => {
  let props;

  beforeEach(() => {
    props = {
      data: [
        {id: 14, name: 'bulbasaur', thumb: '/some/url/1'},
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

  test('Id prop should be contained in href attr of related card', () => {
    delete props.data[1];
    const component = mount(<Related {...props}/>);
    expect(component.find(Styles.Item).prop('href')).toContain(props.data[0].id);
  });

  test('Thumb prop should be equal to src attr of img tag', () => {
    delete props.data[1];
    const component = mount(<Related {...props}/>);
    expect(component.find(Styles.Image).prop('src')).toBe(props.data[0].thumb);
  });

  test('Name prop should be equal to text value of proper node', () => {
    delete props.data[1];
    const component = mount(<Related {...props}/>);
    expect(component.find(Styles.Name).text()).toBe(props.data[0].name);
  });
});