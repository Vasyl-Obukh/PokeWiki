import { CARDS_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';
import { PAGE_LIMIT } from '../constants/config';

export function fetchCards({
  limit = PAGE_LIMIT,
  page = 1,
  evolutionLevels = [],
  elements = [],
  search = ''
}) {
  if (search) {
    return ({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/?search=${search}`
    });
  }
  const offset = (page - 1) * limit;
  const evoLevelsQuery = evolutionLevels.length ? '&&evoLevels=' + evolutionLevels : '';
  const elementsQuery = elements.length ? '&&elements=' + elements : '';
  const url = `${paths.API_ROOT}/?offset=${offset}&&limit=${limit}${evoLevelsQuery}${elementsQuery}`;
  return {
    type: CARDS_REQUESTED,
    url
  };
}

