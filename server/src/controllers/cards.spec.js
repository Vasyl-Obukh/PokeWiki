jest.mock('ioredis');
jest.mock('../utils/indexator');
const indexator = require('../utils/store');
const { getCards } = require('./cards');

describe('Cards controller tests', () => {
  const data = [
    {id: 1, types: ['fire', 'electric']},
    {id: 2, types: ['water', 'normal']},
    {id: 3, types: ['grass', 'poison']}
  ];
  const self = {
    params: {page: 1},
    request: {query: {filters: '{"types": ["fire", "water"]}'}}
  };
  indexator.getPokemons.mockReturnValue(data);

  test('', () => {
    const gen = getCards.apply(self);

    expect(gen.next().value).toEqual([
      {id: 1, types: ['fire', 'electric']},
      {id: 2, types: ['water', 'normal']},
      {id: 3, types: ['grass', 'poison']}
    ]);
    expect(indexator.getPokemons).toBeCalled();
  });
});