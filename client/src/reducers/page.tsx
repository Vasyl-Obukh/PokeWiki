import { PAGE_RECEIVED, PAGE_FETCHING, PAGE_ERROR } from '../constants/actionTypes';
import { PokemonShape } from "../global_interfaces/pokemon";

interface PageAction {
  type: string,
  error?: string,
  data?: Required<PokemonShape>
}

export interface PageState {
  data: Required<PokemonShape> | null,
  isLoading: boolean,
  error?: string
}

const page = (state: PageState = {isLoading: false, data: null}, action: PageAction): PageState => {
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