import { CARDS_RECEIVED, CARDS_FETCHING, CARDS_ERROR } from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';
import cards from './cards';

describe('cards reducers', () => {
  test('CARDS_FETCHING succes', () => {
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

  test('CARDS_RECEIVED succes', () => {
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

  test('CARDS_ERROR succes', () => {
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

  test('Should work correctly if to state prop is missing', () => {
    const state = undefined;
    const action = {type: 'Unknown type'};
    expect(cards(state, action)).toEqual({data: {}, isLoading: false});
  });
});