import React from 'react';
import renderer from 'react-test-renderer';
import ConnectedCards, { Cards, mapStateToProps, mapDispatchToProps } from './index';

describe('<Cards /> snapshot tests', () => {
  let props;

  beforeEach(() => {
    props = {
      isLoading: false,
      elements: [],
      error: undefined,
      search: 'page=2&&types=normal,fire&&evoLevels=1,2&&search=bulbasaur',
      searchParams: {
        page: '2',
        evoLevels: ['1', '2'],
        types: ['normal', 'fire'],
        search: 'bulbasaur'
      },
      fetchCards: jest.fn()
    };
  });

  test('Should render null', () => {
    const component = renderer.create(<Cards {...props}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should invoke fetchCards only once', () => {
    renderer.create(<Cards {...props}/>);
    expect(props.fetchCards.mock.calls.length).toBe(1);
  });

  test('Should render spinner', () => {
    props.isLoading = true;

    const component = renderer.create(<Cards {...props}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render error message block', () => {
    props.error = 'Something goes wrong...';

    const component = renderer.create(<Cards {...props}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render cards', () => {
    props.elements = [
      {name: 'bulbasaur', id: 1},
      {name: 'pikachu', id: 2}
    ];

    const component = renderer.create(<Cards {...props}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});