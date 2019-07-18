jest.mock('ioredis');
jest.mock('worker_threads');
jest.useFakeTimers();
const Redis = require('ioredis');
const { getPokemon, getPokemons } = require('./store');

describe('Store tests', () => {
  const getMock = Redis.prototype.get.mockImplementation(value => {
    const db = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
    if (value === 'timestamp') return Promise.resolve('123');
    if (value === 'count') return Promise.resolve('5');

    return Promise.resolve(
      JSON.stringify(
        db.find(_ =>
          Number.parseInt(value.match(/[0-9]*_([0-9]*)/)[1]) === _.id
        )
      )
    );
  });

  afterEach(() => {
    getMock.mockClear();
  });

  test('getPokemon(): Should return object with predefined id field', async () => {
    const id = 3;

    const data = await getPokemon(id);

    expect(getMock).toBeCalled();
    expect(data).toEqual({id: 3});
  });

  test('getPokemons(): should return array with all data', async () => {
    const result = await getPokemons();

    expect(result).toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
  });
});
