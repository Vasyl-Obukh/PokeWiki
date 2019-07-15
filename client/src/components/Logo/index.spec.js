import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import * as Styles from './styles';
import paths from '../../constants/paths';
import { Logo, mapDispatchToProps } from './index';

Enzyme.configure({adapter: new Adapter()});

describe('<Logo /> tests', () => {
  const mockStore = configureStore();
  const initialState = {};
  const store = mockStore(initialState);

  test('Should render correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Logo />
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render image from predefined directory', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <Logo />
        </Router>
      </Provider>
    );
    expect(component.find('img').prop('src')).toContain('static/images/logo.png');
  });

  test('Logo should be wrapped in a link witch leads to home page', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <Logo />
        </Router>
      </Provider>
    );
    expect(component.find(Styles.StyledLink).prop('to')).toBe(paths.HOME);
  });

  test('mapDispatchToProps() should dispatch correct action on resetForm', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).resetForm();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: '@@redux-form/RESET',
      meta: {form: 'filter'}
    });
  });

  test('Should call function for form reset on click on logo', () => {
    const resetForm = jest.fn();
    const component = mount(
      <Provider store={store}>
        <Router>
          <Logo resetForm={resetForm} />
        </Router>
      </Provider>
    );
    component.find('a').simulate('click');
    expect(resetForm).toBeCalled();
  });
});