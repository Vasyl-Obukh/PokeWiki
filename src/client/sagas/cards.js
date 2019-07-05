import { call, put, takeLatest } from 'redux-saga/effects';
import {CARDS_RECEIVED, CARDS_REQUESTED, CARDS_FETCHING, CARDS_ERROR} from '../constants/actionTypes';

export function* fetchLatestCards(action) {
  try {
    yield put({ type: CARDS_FETCHING });
    const responce = yield call(fetch, action.url);
    // if (responce.status === 404) {
    //   location.href = '/error';
    // }
    const data = yield responce.json();
    yield put({ type: CARDS_RECEIVED, data });
  } catch (error) {
    yield put({ type: CARDS_ERROR, error: 'Something goes wrong...' });
  }
}

export function* fetchCards() {
  yield takeLatest(CARDS_REQUESTED, fetchLatestCards);
}