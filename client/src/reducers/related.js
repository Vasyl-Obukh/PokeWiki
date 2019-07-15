import { RELATED_FETCHING, RELATED_RECEIVED } from '../constants/actionTypes';

const related = (state = {isLoading: false, data: []}, action) => {
  const { type, data } = action;
  switch (type) {
    case RELATED_FETCHING:
      return {data: [], isLoading: true};
    case RELATED_RECEIVED:
      return {data, isLoading: false};
    default:
      return state;
  }
};

export default related;