import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Cards, mapStateToProps, mapDispatchToProps } from './index';
import { CARDS_REQUESTED } from '../../constants/actionTypes';

Enzyme.configure({adapter: new Adapter()});

describe('<Cards /> tests', () => {
  let props;

  beforeEach(() => {
    props = {
      isLoading: false,
      elements: undefined,
      error: undefined,
      search: 'page=2&&types=normal,fire&&evoLevels=1,2&&search=bulbasaur',
      searchParams: {
        page: 2,
        evoLevels: [1, 2],
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

  test('Should update on search prop change', () => {
    const component = mount(<Cards {...props}/>);
    component.setProps({search: 'page=1'});
    expect(props.fetchCards.mock.calls.length).toBe(2);
  });

  test('Should not update if search prop did not changed', () => {
    const component = mount(<Cards {...props}/>);
    component.setProps({search: props.search});
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

describe('Connect functions tests', () => {
  let state, props;

  beforeEach(() => {
    state = {cards: {
      isLoading: false,
      data: {},
      error: undefined,
    }};
    props = {
      searchParams: new URLSearchParams('page=2&&types=normal,fire&&evoLevels=1,2&&search=bulbasaur')
    };
  });

  test('Should render correctly with full set of params', () => {
    expect(mapStateToProps(state, props)).toEqual({
      searchParams: {
        page: 2,
        evoLevels: [1, 2],
        types: ['normal', 'fire'],
        search: 'bulbasaur'
      },
      search: props.searchParams.toString(),
      elements: [],
      isLoading: false,
      error: undefined
    });
  });

  test('Should render correctly without search params', () => {
    delete props.searchParams;

    expect(mapStateToProps(state, props)).toEqual({
      searchParams: {
        page: 1,
        evoLevels: [],
        types: [],
        search: null
      },
      search: '',
      elements: [],
      isLoading: false,
      error: undefined
    });
  });

  test('Should render correctly without data prop', () => {
    delete state.cards.data;

    expect(mapStateToProps(state, props)).toEqual({
      searchParams: {
        page: 2,
        evoLevels: [1, 2],
        types: ['normal', 'fire'],
        search: 'bulbasaur'
      },
      search: props.searchParams.toString(),
      elements: [],
      isLoading: false,
      error: undefined
    });
  });

  test('mapStateToProps() should work correctly', () => {
    state.cards.data.elements = [
      {name: 'bulbasaur', id: 1},
      {name: 'pikachu', id: 2}
    ];
    state.cards.isLoading = true;
    state.cards.error = 'Something goes wrong...';

    expect(mapStateToProps(state, props)).toEqual({
      searchParams: {
        page: 2,
        evoLevels: [1, 2],
        types: ['normal', 'fire'],
        search: 'bulbasaur'
      },
      search: props.searchParams.toString(),
      elements: [
        {name: 'bulbasaur', id: 1},
        {name: 'pikachu', id: 2}
      ],
      isLoading: true,
      error: 'Something goes wrong...'
    });
  });

  test('mapDispatchToProps() should return correct action object', () => {
    const dispatch = jest.fn();
    const searchParams = {
      page: 2,
      evoLevels: [1, 2],
      types: ['normal', 'fire'],
      search: 'bulbasaur'
    };

    mapDispatchToProps(dispatch).fetchCards(searchParams);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CARDS_REQUESTED,
      url: '/api/pages/2/?filters={\"search\":\"bulbasaur\",\"types\":[\"normal\",\"fire\"],\"evoLevels\":[1,2]}',
    });
  });
});