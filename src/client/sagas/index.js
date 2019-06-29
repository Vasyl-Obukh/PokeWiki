import { all } from 'redux-saga/effects';
import { fetchCards } from './cards';

function* rootSaga() {
  yield all([
    fetchCards()
  ]);
}

export default rootSaga;