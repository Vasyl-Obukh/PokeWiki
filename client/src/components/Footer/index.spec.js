import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from './index';
import * as Styles from './styles';

Enzyme.configure({adapter: new Adapter()});

describe('<Footer /> tests', () => {
  test('Should render properly', () => {
    const component = renderer.create(<Footer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Copyright text should be passed to the proper node', () => {
    const copyright = 'copyright';
    const component = mount(<Footer copyright={copyright} /> );
    expect(component.find(Styles.Copyright).text()).toBe(copyright);
  });
});