import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {CARDS_RECEIVED, CARDS_REQUESTED, CARDS_FETCHING, CARDS_ERROR} from '../constants/actionTypes';
import { GetRequestAction } from "../global_interfaces/getRequestAction";

export function* fetchLatestCards(action: GetRequestAction) {
  try {
    yield put({ type: CARDS_FETCHING });
    const { data } = yield call(axios, action.url);
    yield put({ type: CARDS_RECEIVED, data });
  } catch {
    yield put({ type: CARDS_ERROR, error: 'Something goes wrong...' });
  }
}

export function* fetchCards() {
  yield takeLatest(CARDS_REQUESTED, fetchLatestCards);
}