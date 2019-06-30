import { call, put, takeLatest } from 'redux-saga/effects';
import {CARDS_RECEIVED, CARDS_REQUESTED, CARDS_FETCHING, CARDS_ERROR} from '../constants/actionTypes';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* fetchCards() {
  yield takeLatest(CARDS_REQUESTED, function* (action) {
    try {
      yield put({ type: CARDS_FETCHING });
      //yield delay(1000000);
      const data = yield (yield call(fetch, action.url)).json();
      console.log(data);
      yield put({ type: CARDS_RECEIVED, data });
    } catch (error) {
      console.log(error);
      yield put({ type: CARDS_ERROR, error: 'Something goes wrong...' });
    }
  });
}