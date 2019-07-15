const { getEntityData, getEntityFullData, normalizeId } = require('./selectors');
const deepFreeze = require('deep-freeze');

describe('getEntityData() tests', () => {
  let data;

  beforeEach(() => {
    data = {
      name: 'pikachu',
      id: 77,
      sprites: {
        front_default: '/some/url/1',
        front_shiny: '/some/url/2',
        back_default: '/some/url/3',
        back_shiny: '/some/url/4'
      },
      abilities: [
        {
          ability: {name: 'ability 1', url: '/ability/url/1'},
          slot: 1
        },
        {
          ability: {name: 'ability 2', url: '/ability/url/2'},
          slot: 2
        }
      ],
      types: [
        {
          type: {name: 'type 1', url: '/type/url/1'},
          slot: 3
        },
        {
          type: {name: 'type 2', url: '/type/url/2'},
          slot: 4
        }
      ]
    };
  });

  test('Should correctly reflect data if all data is provided', () => {
    deepFreeze(data);
    expect(getEntityData(data)).toEqual({
      name: 'pikachu',
      id: 77,
      thumb: '/some/url/1',
      abilities: ['ability 1', 'ability 2'],
      types: ['type 1', 'type 2']
    });
  });

  test('Should set default values if some data is missing', () => {
    delete data.sprites;
    delete data.abilities;
    delete data.types;
    deepFreeze(data);

    expect(getEntityData(data)).toEqual({
      name: 'pikachu',
      id: 77,
      thumb: '',
      abilities: [],
      types: []
    });
  });
});

describe('getEntityFullData() tests', () => {
  let data;

  beforeEach(() => {
    data = {
      name: 'pikachu',
      id: 77,
      sprites: {
        front_default: '/some/url/1',
        front_shiny: '/some/url/2',
        back_default: '/some/url/3',
        back_shiny: '/some/url/4'
      },
      abilities: [
        {
          ability: {name: 'ability 1', url: '/ability/url/1'},
          slot: 1
        },
        {
          ability: {name: 'ability 2', url: '/ability/url/2'},
          slot: 2
        }
      ],
      types: [
        {
          type: {name: 'type 1', url: '/type/url/1'},
          slot: 3
        },
        {
          type: {name: 'type 2', url: '/type/url/2'},
          slot: 4
        }
      ],
      base_experience: 64,
      height: 5,
      weight: 60,
      stats: [
        {base_stat: 45, effort: 0, stat: {name: 'stat 1', url: '/stat/url/1'}},
        {base_stat: 70, effort: 1, stat: {name: 'stat 2', url: '/stat/url/2'}}
      ]
    };
  });

  test('Should correctly reflect data if all data is provided', () => {
    deepFreeze(data);

    expect(getEntityFullData(data)).toEqual({
      name: 'pikachu',
      id: 77,
      thumb: '/some/url/1',
      abilities: ['ability 1', 'ability 2'],
      types: ['type 1', 'type 2'],
      baseExperience: 64,
      height: 5,
      weight: 60,
      stats: [
        {name: 'stat 1', base: 45},
        {name: 'stat 2', base: 70}
      ]
    });
  });

  test('Should set default values if some data is missing', () => {
    delete data.stats;
    deepFreeze(data);

    expect(getEntityFullData(data)).toEqual({
      name: 'pikachu',
      id: 77,
      thumb: '/some/url/1',
      abilities: ['ability 1', 'ability 2'],
      types: ['type 1', 'type 2'],
      baseExperience: 64,
      height: 5,
      weight: 60,
      stats: []
    });
  });
});

describe('normalizeId() tests', () => {
  test('Should return passed id if id less or equal to the breakpoint(807)', () => {
    expect(normalizeId(1)).toBe(1);
    expect(normalizeId(807)).toBe(807);
  });

  test('Should return normalized( - 9193) id if passed id more than breakpoint(807)', () => {
    expect(normalizeId(10001)).toBe(808);
    expect(normalizeId(10123)).toBe(930);
  });
});