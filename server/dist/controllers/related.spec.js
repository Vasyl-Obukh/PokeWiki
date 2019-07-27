jest.mock('ioredis');
jest.mock('../utils/randomElements');
jest.mock('../utils/store');
var getRandomElements = require('../utils/randomElements');
var store = require('../utils/store');
var getRelated = require('./related').getRelated;
describe('Related controller tests', function () {
    var data = [
        { id: 1, types: ['fire', 'electric'] },
        { id: 2, types: ['water', 'normal'] },
        { id: 3, types: ['grass', 'poison'] }
    ];
    store.getPokemons.mockReturnValue(data);
    getRandomElements.mockImplementation(function (_) { return _; });
    var self = {
        query: { types: 'fire,water' }
    };
    test('Should return defined amount of pokemons filtered by types', function () {
        var gen = getRelated.apply(self);
        expect(gen.next().value).toEqual([
            { id: 1, types: ['fire', 'electric'] },
            { id: 2, types: ['water', 'normal'] },
            { id: 3, types: ['grass', 'poison'] }
        ]);
        expect(store.getPokemons).toBeCalled();
        gen.next(data);
        expect(getRandomElements).toHaveBeenCalledWith([
            { id: 1, types: ['fire', 'electric'] },
            { id: 2, types: ['water', 'normal'] }
        ], 5);
    });
});
//# sourceMappingURL=related.spec.js.map