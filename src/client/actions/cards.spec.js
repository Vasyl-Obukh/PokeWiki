import { CARDS_REQUESTED } from '../constants/actionTypes';
import { PAGE_LIMIT } from '../constants/config';
import { fetchCards } from './cards';
import deepFreeze from 'deep-freeze';

describe('Cards actions tests', () => {
  test('Should pass all arguments in the proper places in the url', () => {
    const params = {
      limit: PAGE_LIMIT,
      page: 2,
      evoLevels: [1, 2],
      types: ['fire', 'steel'],
    };

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: '/api/pages/2/?filters={"search":"","types":["fire","steel"],"evoLevels":[1,2]}'
    });
  });

  test('Should pass default values to the url', () => {
    const params = {};

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: '/api/pages/1/?filters={"search":"","types":[],"evoLevels":[]}'
    });
  });
});