import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  PAGE_RECEIVED,
  PAGE_REQUESTED,
  PAGE_FETCHING,
  PAGE_ERROR,
  RELATED_FETCHING,
  RELATED_RECEIVED
} from '../constants/actionTypes';
import paths from '../constants/paths';
import { fetchLatestPage } from './page';
import deepFreeze from 'deep-freeze';

describe('page sagas', () => {
  it('PAGE_REQUESTED SAGA', () => {
    const action = {
      type: PAGE_REQUESTED,
      url: '/api/pokemon/7'
    };
    const error = {};
    const data = {data: {types: []}};
    const related = {data: {}};

    deepFreeze(action);
    deepFreeze(error);
    deepFreeze(data);
    deepFreeze(related);

    const gen = fetchLatestPage(action);

    expect(gen.next().value).toEqual(put({ type: PAGE_FETCHING }));
    expect(gen.next().value).toEqual(call(axios, action.url));
    expect(gen.next(data).value).toEqual( put({ type: PAGE_RECEIVED, data: data.data }));

    expect(gen.next().value).toEqual(put({ type: RELATED_FETCHING }));
    expect(gen.next().value).toEqual(call(axios, `${paths.API_ROOT}/related/?types=${data.data.types}`));
    expect(gen.next(related).value).toEqual( put({ type: RELATED_RECEIVED, data: related.data }));

    expect(gen.throw(error).value).toEqual(put({ type: PAGE_ERROR, error: 'Something goes wrong...' }));
  });
});