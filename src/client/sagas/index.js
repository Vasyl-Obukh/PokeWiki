import { all } from 'redux-saga/effects';
import { fetchCards } from './cards';
import { fetchPage } from './page';

function* rootSaga() {
  yield all([
    fetchCards(),
    fetchPage()
  ]);
}

export default rootSaga;