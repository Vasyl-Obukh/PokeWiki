jest.mock('ioredis');
jest.mock('../utils/randomElements');
jest.mock('../utils/store');
const getRandomElements = require('../utils/randomElements');
const store = require('../utils/store');
const { getRelated } = require('./related');

describe('Related controller tests', () => {
  const data = [
    {id: 1, types: ['fire', 'electric']},
    {id: 2, types: ['water', 'normal']},
    {id: 3, types: ['grass', 'poison']}
  ];
  store.getPokemons.mockReturnValue(data);
  getRandomElements.mockImplementation(_ => _);
  const self = {
    query: {types: 'fire,water'}
  };

  test('Should return defined amount of pokemons filtered by types', () => {
    const gen = getRelated.apply(self);

    expect(gen.next().value).toEqual([
      {id: 1, types: ['fire', 'electric']},
      {id: 2, types: ['water', 'normal']},
      {id: 3, types: ['grass', 'poison']}
    ]);
    expect(store.getPokemons).toBeCalled();

    gen.next(data);

    expect(getRandomElements).toHaveBeenCalledWith(
      [
        {id: 1, types: ['fire', 'electric']},
        {id: 2, types: ['water', 'normal']}
      ],
      5
    );
  });
});