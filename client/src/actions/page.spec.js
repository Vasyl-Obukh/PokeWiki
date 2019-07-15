import { PAGE_REQUESTED } from '../constants/actionTypes';
import { fetchPage } from './page';

describe('Page actions tests', () => {
  test('Should return object with "url" property that contains passed "id"', () => {
    const params = 7;

    expect(fetchPage(params)).toEqual({
      type: PAGE_REQUESTED,
      url: '/api/pokemon/7'
    });
  });
});