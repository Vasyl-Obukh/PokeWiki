import { CARDS_RECEIVED, CARDS_FETCHING, CARDS_ERROR } from '../constants/actionTypes';

const cardsData = (state, action) => {
  const {type, data: { elements, count }} = action;
  switch (type) {
    case CARDS_RECEIVED:
      return {elements, count};
  }
};

const cards = (state = {isLoading: false, data: {}}, action) => {
  const { type, error } = action;
  switch (type) {
    case CARDS_FETCHING:
      return {data: {}, isLoading: true, error: undefined};
    case CARDS_RECEIVED:
      return {data: cardsData(state.data, action), isLoading: false,  error: undefined};
    case CARDS_ERROR:
      return {data: {}, isLoading: false, error};
    default:
      return state;
  }
};

export default cards;