import { RELATED_FETCHING, RELATED_RECEIVED } from '../constants/actionTypes';
import { BasicPokemonShape } from "../global_interfaces/pokemon";
interface RelatedAction {
  type: string,
  data: BasicPokemonShape[]
}

export interface RelatedState {
 data: BasicPokemonShape[],
 isLoading: boolean,
}

const related = (state: RelatedState = {isLoading: false, data: []}, action: RelatedAction): RelatedState => {
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