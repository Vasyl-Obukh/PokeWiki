import { CARDS_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';

export function fetchCards({
  limit = 30,
  page = 1,
  evolutionLevels = [],
  species = [],
  elements = [],
  search = ''
} = {}) {
  const offset = (page - 1) * limit;
  const evoLevelsQuery = evolutionLevels.length ? '&&evolutionLevels=' + evolutionLevels : '';
  const speciesQuery = species.length ? '&&species=' + species : '';
  const elementsQuery = elements.length ? '&&elements=' + elements : '';
  const searchQuery = search ? '&&search=' + search : '';
  return {
    type: CARDS_REQUESTED,
    url: `${paths.API_ROOT}/?offset=${offset}&&limit=${limit}${evoLevelsQuery}${speciesQuery}${elementsQuery}${searchQuery}`
  };
}

