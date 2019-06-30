import { CARDS_RECEIVED, CARDS_FETCHING, CARDS_ERROR } from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';
import cards from './cards';

describe('cards reducers', () => {
  it('CARDS_FETCHING succes', () => {
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

  it('CARDS_RECEIVED succes', () => {
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

  it('CARDS_RECEIVED succes', () => {
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
});