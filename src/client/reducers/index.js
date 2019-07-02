import { combineReducers } from 'redux';
import cards from './cards';
import page from './page';
import related from './related';

export default combineReducers({
  cards,
  page,
  related
});