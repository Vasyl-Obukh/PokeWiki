import { take, select } from 'redux-saga/effects';

export function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const state = yield select();

    console.groupCollapsed(action.type);
    console.log('action: ', action);
    console.log('state after:', state);
    console.groupEnd(action.type);
  }
}