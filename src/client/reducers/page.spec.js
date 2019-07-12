import {PAGE_RECEIVED, PAGE_FETCHING, PAGE_ERROR } from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';
import page from './page';

describe('page reducers', () => {
  test('PAGE_FETCHING success', () => {
    const state = {};
    const action = {type: PAGE_FETCHING};

    deepFreeze(state);
    deepFreeze(action);

    expect(page(state, action)).toEqual({
      data: null,
      isLoading: true,
      error: undefined
    });
  });

  test('PAGE_RECEIVED succes', () => {
    const state = {};
    const action = {
      type: PAGE_RECEIVED,
      data: {
        id: 24,
        name: 'pikachu',
        baseExperience: 164
      }
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(page(state, action)).toEqual({
      data: {
        id: 24,
        name: 'pikachu',
        baseExperience: 164
      },
      isLoading: false,
      error: undefined
    });
  });

  test('PAGE_ERROR succes', () => {
    const state = {};
    const error = new Error('something goes wrong');
    const action = {
      type: PAGE_ERROR,
      error
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(page(state, action)).toEqual({
      data: null,
      isLoading: false,
      error
    });
  });

  test('Should return state if type does not match any existing', () => {
    const state = {};
    const action = {type: 'Unknown type'};
    expect(page(state, action)).toEqual(state);
  });

  test('Should work correctly if to state prop is missing', () => {
    const state = undefined;
    const action = {type: 'Unknown type'};
    expect(page(state, action)).toEqual({data: null, isLoading: false});
  });
});