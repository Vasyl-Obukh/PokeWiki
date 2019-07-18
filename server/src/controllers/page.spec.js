jest.mock('../utils/store');
jest.mock('ioredis');
const store = require('../utils/store');
const { getPage } = require('./page');

describe('Page controller tests', () => {
  store.getPokemon.mockReturnValue({id: 7});
  const self = {
    params: {id: 99}
  };

  test('Should call "getPokemon()" on first "next()" with argument from "this.params.id" ', () => {
    const gen = getPage.apply(self);

    expect(gen.next({id: 33}).value).toEqual({id: 7});
    expect(store.getPokemon).toHaveBeenCalledWith(99);
  });
});