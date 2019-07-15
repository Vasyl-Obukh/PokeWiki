import { CARDS_RECEIVED, CARDS_FETCHING, CARDS_ERROR } from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';
import cards from './cards';

describe('Cards reducers tests', () => {
  test('Should set "isLoading" property to true and the others to default on cards fetching', () => {
    const state = {};
    const action = {type: CARDS_FETCHING};

    deepFreeze(state);
    deepFreeze(action);

    expect(cards(state, action)).toEqual({
      data: {},
      isLoading: true,
      error: undefined
    });
  });

  test('Should assign fetched data to "data" property and set the others to default when cards received', () => {
    const state = {};
    const action = {
      type: CARDS_RECEIVED,
      data: {
        count: 10,
        elements: [
          {id: 1, name: 'bulbasaur'},
          {id: 1, name: 'charizard'}
        ]
      }
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(cards(state, action)).toEqual({
      data: {
        count: 10,
        elements: [
          {id: 1, name: 'bulbasaur'},
          {id: 1, name: 'charizard'}
        ]
      },
      isLoading: false,
      error: undefined
    });
  });

  test('Should assign "error" property to received error and the others to default on cards error', () => {
    const state = {};
    const error = new Error('something goes wrong');
    const action = {
      type: CARDS_ERROR,
      error
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(cards(state, action)).toEqual({
      data: {},
      isLoading: false,
      error
    });
  });

  test('Should return state if type does not match any existing', () => {
    const state = {};
    const action = {type: 'Unknown type'};
    expect(cards(state, action)).toEqual(state);
  });

  test('Should work correctly if state prop is missing', () => {
    const state = undefined;
    const action = {type: 'Unknown type'};
    expect(cards(state, action)).toEqual({data: {}, isLoading: false});
  });
});