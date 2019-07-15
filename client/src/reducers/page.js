import { PAGE_RECEIVED, PAGE_FETCHING, PAGE_ERROR } from '../constants/actionTypes';

const page = (state = {isLoading: false, data: null}, action) => {
  const { type, error, data } = action;
  switch (type) {
    case PAGE_FETCHING:
      return {data: null, isLoading: true, error: undefined};
    case PAGE_RECEIVED:
      return {data, isLoading: false,  error: undefined};
    case PAGE_ERROR:
      return {data: null, isLoading: false, error};
    default:
      return state;
  }
};

export default page;