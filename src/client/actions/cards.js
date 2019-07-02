import { CARDS_REQUESTED } from '../constants/actionTypes';
import { PAGE_LIMIT } from '../constants/config';
import paths from '../constants/paths';

export function fetchCards({
  page = 1,
  evoLevels = [],
  elements = [],
  search = ''
}) {
  if (search) {
    return ({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/?search=${search}`
    });
  }
  const offset = (page - 1) * PAGE_LIMIT;
  const evoLevelsQuery = evoLevels.length ? '&&evoLevels=' + evoLevels : '';
  const elementsQuery = elements.length ? '&&elements=' + elements : '';
  const url = `${paths.API_ROOT}/?offset=${offset}&&limit=${PAGE_LIMIT}${evoLevelsQuery}${elementsQuery}`;
  return {
    type: CARDS_REQUESTED,
    url
  };
}

