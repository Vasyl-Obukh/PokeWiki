import { call, put, takeLatest } from 'redux-saga/effects';
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
    const responce = yield call(fetch, action.url);
    const data = yield responce.json();
    console.log('Page data received', data);
    yield put({ type: PAGE_RECEIVED, data });

    yield put({ type: RELATED_FETCHING });
    const relatedResponce = yield call(fetch, `${paths.API_ROOT}/related/?types=${data.types}`);
    const related = yield relatedResponce.json();
    console.log('Related data received', related);
    yield put({ type: RELATED_RECEIVED, related });
  } catch (error) {
    console.error(error);
    yield put({ type: PAGE_ERROR, error: 'Something goes wrong...' });
  }
}

export function* fetchPage() {
  yield takeLatest(PAGE_REQUESTED, fetchLatestPage);
}