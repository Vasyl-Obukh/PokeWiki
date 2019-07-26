import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas';
import { CardsState } from "../reducers/cards";
import { PageState } from "../reducers/page";
import { RelatedState } from "../reducers/related";

const sagaMiddleware = createSagaMiddleware();

export interface State {
  cards: CardsState,
  page: PageState,
  related: RelatedState
  [key: string]: any
}

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;