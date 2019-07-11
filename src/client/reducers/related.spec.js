import {RELATED_RECEIVED, RELATED_FETCHING } from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';
import related from './related';

describe('related reducers', () => {
  test('RELATED_FETCHING success', () => {
    const state = {};
    const action = {type: RELATED_FETCHING};

    deepFreeze(state);
    deepFreeze(action);

    expect(related(state, action)).toEqual({
      data: [],
      isLoading: true
    });
  });

  test('RELATED_RECEIVED succes', () => {
    const state = {};
    const action = {
      type: RELATED_RECEIVED,
      data: [{
        id: 24,
        name: 'pikachu',
      }]
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(related(state, action)).toEqual({
      data: [{
        id: 24,
        name: 'pikachu'
      }],
      isLoading: false,
    });
  });

  test('Should return state if type does not match any existing', () => {
    const state = {};
    const action = {type: 'Unknown type'};
    expect(related(state, action)).toEqual(state);
  });
});