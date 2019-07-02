import { all } from 'redux-saga/effects';
import { fetchCards } from './cards';
import { fetchPage } from './page';
import { watchAndLog } from './logger';

function* rootSaga() {
  yield all([
    watchAndLog(),
    fetchCards(),
    fetchPage()
  ]);
}

export default rootSaga;