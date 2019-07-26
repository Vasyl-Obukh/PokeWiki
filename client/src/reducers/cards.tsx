import { CARDS_RECEIVED, CARDS_FETCHING, CARDS_ERROR } from '../constants/actionTypes';
import { PokemonShape } from "../global_interfaces/pokemon";

interface DataShape {
  elements?: PokemonShape[],
  count?: number
}

interface CardsAction {
  type: string,
  error?: string,
  data?: DataShape
}

export interface CardsState {
  data: DataShape,
  isLoading: boolean,
  error?: string
}

const cards = (state: CardsState = {isLoading: false, data: {}}, action: CardsAction): CardsState => {
  const { type, error, data } = action;
  switch (type) {
    case CARDS_FETCHING:
      return {data: {}, isLoading: true, error: undefined};
    case CARDS_RECEIVED:
      return {data, isLoading: false,  error: undefined};
    case CARDS_ERROR:
      return {data: {}, isLoading: false, error};
    default:
      return state;
  }
};

export default cards;