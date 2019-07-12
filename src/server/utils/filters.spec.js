const {
  searchPokemons,
  filterBySearch,
  filterByTypes,
  filterByEvolutionLevels,
  createPipeline
} = require('./filters');

describe('searchPokemos()', () => {
  test('Should return true if strings are equal', () => {
    const name = 'pikachu';
    const search = 'pikachu';
    expect(searchPokemons(name, search)).toBe(true);
  });

  test('Should return true if strings are almost equal', () => {
    const name = 'charmander';
    const search = 'charma';
    expect(searchPokemons(name, search)).toBe(true);
  });

  test('Should return false if strings are completely different', () => {
    const name = 'pikachu';
    const search = 'bulbasaur';
    expect(searchPokemons(name, search)).toBe(false);
  });
});

describe('filterBySearch()', () => {
  test('Should return passed object if there filters has not search prop or value array is empty', () => {
    const argument = {
      value: [],
      filters: {
        search: 'pikachu'
      }
    };
    expect(filterBySearch(argument)).toEqual({
      value: [],
      filters: {
        search: 'pikachu'
      }
    });

    delete argument.filters.search;
    expect(filterBySearch(argument)).toEqual({
      value: [],
      filters: {}
    });
  });

  test('Should return object with value prop containing array with objects which similar or exact as search filter', () => {
    const argument = {
      value: [{name: 'pikachu'}, {name: 'bulbasaur'}],
      filters: {
        search: 'pikac'
      }
    };
    expect(filterBySearch(argument)).toEqual({
      value: [{name: 'pikachu'}],
      filters: {
        search: 'pikac'
      }
    });
  });

  test('Should return equal object if filters prop is missing', () => {
    const argument = {value: [{name: 'pikachu'}, {name: 'bulbasaur'}]};
    expect(filterBySearch(argument)).toEqual({
      value: [{name: 'pikachu'}, {name: 'bulbasaur'}],
      filters: {}
    });
  });
});

describe('filterByTypes()', () => {
  test('Should return passed object if there filters has not types prop or it is empty array or value array is empty', () => {
    const argument = {
      value: [],
      filters: {
        types: ['fire', 'grass']
      }
    };
    expect(filterByTypes(argument)).toEqual({
      value: [],
      filters: {
        types: ['fire', 'grass']
      }
    });

    argument.filters.types = [];
    expect(filterByTypes(argument)).toEqual({
      value: [],
      filters: {
        types: []
      }
    });

    delete argument.filters.types;
    expect(filterByTypes(argument)).toEqual({
      value: [],
      filters: {}
    });
  });

  test('Should return object with value prop containing array with objects with at least one of types', () => {
    const argument = {
      value: [
        {name: 'pikachu', types: ['electric']},
        {name: 'charmander', types: ['dragon', 'fire']},
        {name: 'bulbasaur', types: ['grass', 'poison']}
      ],
      filters: {
        types: ['fire', 'grass']
      }
    };
    expect(filterByTypes(argument)).toEqual({
      value: [
        {name: 'charmander', types: ['dragon', 'fire']},
        {name: 'bulbasaur', types: ['grass', 'poison']}
      ],
      filters: {
        types: ['fire', 'grass']
      }
    });
  });

  test('Should return equal object if filters prop is missing', () => {
    const argument = {value: [{name: 'pikachu'}, {name: 'bulbasaur'}]};
    expect(filterByTypes(argument)).toEqual({
      value: [{name: 'pikachu'}, {name: 'bulbasaur'}],
      filters: {}
    });
  });
});

describe('filterByEvolutionLevels()', () => {
  test('Should return passed object if there filters has not types prop or it is empty array or value array is empty', () => {
    const argument = {
      value: [],
      filters: {
        evoLevels: [1, 2]
      }
    };
    expect(filterByEvolutionLevels(argument)).toEqual({
      value: [],
      filters: {
        evoLevels: [1, 2]
      }
    });

    argument.filters.evoLevels = [];
    expect(filterByEvolutionLevels(argument)).toEqual({
      value: [],
      filters: {
        evoLevels: []
      }
    });

    delete argument.filters.evoLevels;
    expect(filterByEvolutionLevels(argument)).toEqual({
      value: [],
      filters: {}
    });
  });

  test('Should return object with value prop containing array with objects with one of levels', () => {
    const argument = {
      value: [
        {name: 'pikachu', evoLevel: 1},
        {name: 'charmander', evoLevel: 2},
        {name: 'bulbasaur', evoLevel: 3}
      ],
      filters: {
        evoLevels: [1, 3]
      }
    };
    expect(filterByEvolutionLevels(argument)).toEqual({
      value: [
        {name: 'pikachu', evoLevel: 1},
        {name: 'bulbasaur', evoLevel: 3}
      ],
      filters: {
        evoLevels: [1, 3]
      }
    });
  });

  test('Should return equal object if filters prop is missing', () => {
    const argument = {value: [{name: 'pikachu'}, {name: 'bulbasaur'}]};
    expect(filterByEvolutionLevels(argument)).toEqual({
      value: [{name: 'pikachu'}, {name: 'bulbasaur'}],
      filters: {}
    });
  });
});

describe('createPipeline()', () => {
  let argument;

  beforeEach(() => {
    argument = {
      value: [
        {name: 'pikachu', evoLevel: 1, types: ['electric']},
        {name: 'charmander', evoLevel: 2, types: ['dragon', 'fire']},
        {name: 'bulbasaur', evoLevel: 3, types: ['grass', 'poison']},
        {name: 'raichu', evoLevel: 2, types: ['electric']},
        {name: 'charizard', evoLevel: 4, types: ['dragon', 'fire']},
        {name: 'ivysaur', evoLevel: 3, types: ['poison']},
        {name: 'smoochum', evoLevels: 1, types: ['psychic', 'ice']}
      ],
      filters: {
        search: '',
        types: [],
        evoLevels: [],
      }
    };
  });

  test('Should return object with value property containing objects filtered by one function', () => {
    argument.filters.search = 'char';
    expect(createPipeline(filterBySearch)(argument)).toEqual({
      value: [
        {name: 'charmander', evoLevel: 2, types: ['dragon', 'fire']},
        {name: 'charizard', evoLevel: 4, types: ['dragon', 'fire']}
      ],
      filters: {
        search: 'char',
        types: [],
        evoLevels: [],
      }
    });
  });

  test('Should return object with value property containing objects filtered by all passed functions', () => {
    argument.filters = {
      search: 'chu',
      types: ['electric'],
      evoLevels: [1]
    };

    expect(createPipeline(filterBySearch, filterByTypes, filterByEvolutionLevels)(argument)).toEqual({
      value: [{name: 'pikachu', evoLevel: 1, types: ['electric']}],
      filters: {
        search: 'chu',
        types: ['electric'],
        evoLevels: [1]
      }
    });
  });

  test('Should return equal objects filters params is empty', () => {
    expect(createPipeline(filterBySearch)(argument)).toEqual(argument);
  });
});