jest.mock('ioredis');
jest.mock('worker_threads');
jest.useFakeTimers();
const Redis = require('ioredis');
const { getPokemon, getPokemons } = require('./store');

describe('Store tests', () => {
  const getMock = Redis.prototype.get.mockImplementation((id, cb) => {
    const db = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
    cb(null, JSON.stringify(db.find(_ => _.id = id)));
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
