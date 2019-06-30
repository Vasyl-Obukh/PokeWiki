import { call, put, takeLatest } from 'redux-saga/effects';
import {ARDS_RECEIVED, CARDS_REQUESTED, CARDS_FETCHING, CARDS_ERROR, CARDS_RECEIVED} from '../constants/actionTypes';
import paths from '../constants/paths';
import { PAGE_LIMIT } from '../constants/config';
import { fetchLatestCards } from './cards';
import deepFreeze from 'deep-freeze';

describe('cards sagas', () => {
  it('CARDS_REQUESTED SAGA', () => {
    const action = {
      type: CARDS_REQUESTED,
      url: '/api/?offset=0&&limit=1'
    };
    const error = {};
    const gen = fetchLatestCards(action);

    expect(gen.next().value).toEqual(put({ type: CARDS_FETCHING }));
    expect(gen.next().value).toEqual(call(fetch, action.url));

    //gen.next(); // don't know how to test

    expect(gen.throw(error).value).toEqual(put({ type: CARDS_ERROR, error: 'Something goes wrong...' }));
  });
});