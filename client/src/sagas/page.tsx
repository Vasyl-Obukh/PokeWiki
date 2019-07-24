import { call, put, takeLatest } from 'redux-saga/effects';
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

export function* fetchLatestPage(action) {
  try {
    yield put({ type: PAGE_FETCHING });
    const { data } = yield call(axios, action.url);
    yield put({ type: PAGE_RECEIVED, data });

    yield put({ type: RELATED_FETCHING });
    const { data: related } = yield call(axios, `${paths.API_ROOT}/related/?types=${data.types}`);
    yield put({ type: RELATED_RECEIVED, data: related });
  } catch (error) {
    yield put({ type: PAGE_ERROR, error: 'Something goes wrong...' });
  }
}

export function* fetchPage() {
  yield takeLatest(PAGE_REQUESTED, fetchLatestPage);
}