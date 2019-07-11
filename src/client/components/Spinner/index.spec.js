import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Spinner from './index';

describe('<Spinner /> tests', () => {
  test('Should render correctly', () => {
    const component = renderer.create(<Spinner/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});