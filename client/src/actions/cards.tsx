import { CARDS_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';
import { GetRequestAction } from "../global_interfaces/getRequestAction";
import { SearchParams } from '../global_interfaces/searchParams';

export function fetchCards(searchParams: SearchParams): GetRequestAction {
  const {
    page = 1,
    search = '',
    types = [],
    evoLevels = []
  } = searchParams;
  const url: string = `${paths.API_ROOT}/pages/${page}/?filters=${JSON.stringify({  search, types, evoLevels })}`;

  return {
    type: CARDS_REQUESTED,
    url
  };
}

