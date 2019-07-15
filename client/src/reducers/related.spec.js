import {RELATED_RECEIVED, RELATED_FETCHING } from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';
import related from './related';

describe('Related reducers tests', () => {
  test('Should set "isLoading" property to true and the others to default on related fetching', () => {
    const state = {};
    const action = {type: RELATED_FETCHING};

    deepFreeze(state);
    deepFreeze(action);

    expect(related(state, action)).toEqual({
      data: [],
      isLoading: true
    });
  });

  test('Should assign fetched data to "data" property and set the others to default when related received', () => {
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

  test('Should work correctly if state prop is missing', () => {
    const state = undefined;
    const action = {type: 'Unknown type'};
    expect(related(state, action)).toEqual({data: [], isLoading: false});
  });
});