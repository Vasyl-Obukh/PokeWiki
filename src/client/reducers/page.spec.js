import {PAGE_RECEIVED, PAGE_FETCHING, PAGE_ERROR } from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';
import page from './page';

describe('page reducers', () => {
  it('PAGE_FETCHING success', () => {
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

  it('PAGE_RECEIVED succes', () => {
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

  it('PAGE_ERROR succes', () => {
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
});