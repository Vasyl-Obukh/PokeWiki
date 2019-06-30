import { call, put, takeLatest } from 'redux-saga/effects';
import {CARDS_RECEIVED, CARDS_REQUESTED, CARDS_FETCHING, CARDS_ERROR} from '../constants/actionTypes';

export function* fetchLatestCards(action) {
  try {
    yield put({ type: CARDS_FETCHING });
    const data = yield (yield call(fetch, action.url)).json();
    yield put({ type: CARDS_RECEIVED, data });
  } catch (error) {
    console.error(error);
    yield put({ type: CARDS_ERROR, error: 'Something goes wrong...' });
  }
}

export function* fetchCards() {
  yield takeLatest(CARDS_REQUESTED, fetchLatestCards);
}