import { combineReducers } from 'redux';
import cards from './cards';
import page from './page';
import related from './related';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  cards,
  page,
  related,
  form: formReducer
});