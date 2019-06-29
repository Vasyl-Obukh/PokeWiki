import { CARDS_RECEIVED, CARDS_FETCHING, CARDS_ERROR } from '../constants/actionTypes';

const cards = (state = {isLoading: false, data: []}, action) => {
  const { type, data, error } = action;
  switch (type) {
    case CARDS_FETCHING:
      return {...state, isLoading: true, error: undefined};
    case CARDS_RECEIVED:
      return {data, isLoading: false,  error: undefined};
    case CARDS_ERROR:
      return {...state, isLoading: false, error};
    default:
      return state;
  }
};

export default cards;