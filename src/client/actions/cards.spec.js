import { CARDS_REQUESTED } from '../constants/actionTypes';
import paths from '../constants/paths';
import { PAGE_LIMIT } from '../constants/config';
import { fetchCards } from './cards';
import deepFreeze from 'deep-freeze';

describe('cards actions', () => {
  it('CARDS_REQUESTED all params succes', () => {
    const params = {
      limit: PAGE_LIMIT,
      page: 2,
      evoLevels: [1, 2],
      types: ['fire', 'steel'],
    };

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/pages/2/?filters=${JSON.stringify({ search: '', types: params.types, evoLevels: params.evoLevels })}`
    });
  });

  it('CARDS_REQUESTED without params succes', () => {
    const params = {};

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/pages/1/?filters=${JSON.stringify({ search: '', types: [], evoLevels: [] })}`
    });
  });

  it('CARDS_REQUESTED only search succes', () => {
    const params = {
      search: 'some text',
    };

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/pages/1/?filters=${JSON.stringify({ search: 'some text', types: [], evoLevels: [] })}`
    });
  });

  it('CARDS_REQUESTED search with other params succes', () => {
    const params = {
      search: 'some text',
      limit: 24,
      page: 2,
      evoLevels: [1, 2],
      types: ['fire', 'steel'],
    };

    deepFreeze(params);

    expect(fetchCards(params)).toEqual({
      type: CARDS_REQUESTED,
      url: `${paths.API_ROOT}/pages/2/?filters=${JSON.stringify({ search: 'some text', types: params.types, evoLevels: params.evoLevels })}`
    });
  });
});