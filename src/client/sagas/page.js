import { call, put, takeLatest } from 'redux-saga/effects';
import {PAGE_RECEIVED, PAGE_REQUESTED, PAGE_FETCHING, PAGE_ERROR} from '../constants/actionTypes';

export function* fetchLatestPage(action) {
  try {
    yield put({ type: PAGE_FETCHING });
    const responce = yield call(fetch, action.url);
    const data = yield responce.json();
    yield put({ type: PAGE_RECEIVED, data });
  } catch (error) {
    console.error(error);
    yield put({ type: PAGE_ERROR, error: 'Something goes wrong...' });
  }
}

export function* fetchPage() {
  yield takeLatest(PAGE_REQUESTED, fetchLatestPage);
}