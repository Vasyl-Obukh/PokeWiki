import { CARDS_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';

export function fetchCards({
  limit = 18,
  page = 1,
  evolutionLevels = [],
  elements = [],
  search = ''
}) {
  const offset = (page - 1) * limit;
  const evoLevelsQuery = evolutionLevels.length ? '&&evolutionLevels=' + evolutionLevels : '';
  const elementsQuery = elements.length ? '&&elements=' + elements : '';
  const searchQuery = search ? '&&search=' + search : '';
  const url = `${paths.API_ROOT}/?offset=${offset}&&limit=${limit}${evoLevelsQuery}${elementsQuery}${searchQuery}`;
  console.log(url);
  return {
    type: CARDS_REQUESTED,
    url//: `${paths.API_ROOT}/?offset=${offset}&&limit=${limit}${evoLevelsQuery}${elementsQuery}${searchQuery}`
  };
}

