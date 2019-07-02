import { PAGE_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';
import { fetchPage } from './page';

describe('page actions', () => {
  it('PAGE_REQUESTED success', () => {
    const params = 7;

    expect(fetchPage(params)).toEqual({
      type: PAGE_REQUESTED,
      url: `${paths.API_ROOT}/pokemon/7`
    });
  });
});