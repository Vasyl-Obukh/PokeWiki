import { PAGE_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';
import { GetRequestAction } from "../global_interfaces/getRequestAction";

export function fetchPage(id: number): GetRequestAction {
  return {
    type: PAGE_REQUESTED,
    url: `${paths.API_ROOT}/pokemon/${id}`
  };
}