import { combineReducers } from 'redux';
import cards from './cards';
import page from './page';

export default combineReducers({
  cards,
  page
});