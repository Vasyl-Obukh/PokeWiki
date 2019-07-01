import { CARDS_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';
import { PAGE_LIMIT } from '../constants/config';
import { fetchCards } from './cards';
import deepFreeze from 'deep-freeze';

describe('cards actions', () => {
  it('CARDS_REQUESTED all params succes', () => {
    const params = {
      limit: 24,
      page: 2,
      evoLevels: [1, 2],
      elements: ['fire', 'steel'],
    };

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/?offset=24&&limit=24&&evoLevels=1,2&&elements=fire,steel`
    });
  });

  it('CARDS_REQUESTED without params succes', () => {
    const params = {};

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/?offset=0&&limit=${PAGE_LIMIT}`
    });
  });

  it('CARDS_REQUESTED only search succes', () => {
    const params = {
      search: 'some text',
    };

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/?search=some text`
    });
  });

  it('CARDS_REQUESTED search with other params succes', () => {
    const params = {
      search: 'some text',
      limit: 24,
      page: 2,
      evoLevels: [1, 2],
      elements: ['fire', 'steel'],
    };

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/?search=some text`
    });
  });
});