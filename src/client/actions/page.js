import { PAGE_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';

export function fetchPage(id) {
  return {
    type: PAGE_REQUESTED,
    url: `${paths.API_ROOT}/pokemon/${id}`
  };
}

