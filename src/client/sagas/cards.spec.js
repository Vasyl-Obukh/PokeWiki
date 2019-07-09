import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {CARDS_REQUESTED, CARDS_FETCHING, CARDS_ERROR, CARDS_RECEIVED} from '../constants/actionTypes';
import { fetchLatestCards } from './cards';
import deepFreeze from 'deep-freeze';

describe('cards sagas', () => {
  it('CARDS_REQUESTED SAGA', () => {
    const action = {
      type: CARDS_REQUESTED,
      url: '/api/?offset=0&&limit=1'
    };
    const error = {};
    const data = {data: {}};

    deepFreeze(action);
    deepFreeze(error);
    deepFreeze(data);

    const gen = fetchLatestCards(action);

    expect(gen.next().value).toEqual(put({ type: CARDS_FETCHING }));
    expect(gen.next().value).toEqual(call(axios, action.url));
    expect(gen.next(data).value).toEqual( put({ type: CARDS_RECEIVED, data: data.data }));

    expect(gen.throw(error).value).toEqual(put({ type: CARDS_ERROR, error: 'Something goes wrong...' }));
  });
});