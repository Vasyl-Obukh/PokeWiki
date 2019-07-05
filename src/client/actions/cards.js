import { CARDS_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';

export function fetchCards({
  page = 1,
  evoLevels = [],
  elements = [],
  search = ''
}) {
  const url = `${paths.API_ROOT}/pages/${page}/?filters=${JSON.stringify({evoLevels, elements, search})}`;
  return {
    type: CARDS_REQUESTED,
    url
  };
}

