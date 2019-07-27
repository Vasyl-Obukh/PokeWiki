jest.mock('ioredis');
jest.mock('../utils/store');
var store = require('../utils/store');
var getCards = require('./cards').getCards;
describe('Cards controller tests', function () {
    var data = [
        { id: 1, types: ['fire', 'electric'] },
        { id: 2, types: ['water', 'normal'] },
        { id: 3, types: ['grass', 'poison'] }
    ];
    var self = {
        params: { page: 1 },
        request: { query: { filters: '{"types": ["fire", "water"]}' } }
    };
    store.getPokemons.mockReturnValue(data);
    test('', function () {
        var gen = getCards.apply(self);
        expect(gen.next().value).toEqual([
            { id: 1, types: ['fire', 'electric'] },
            { id: 2, types: ['water', 'normal'] },
            { id: 3, types: ['grass', 'poison'] }
        ]);
        expect(store.getPokemons).toBeCalled();
    });
});
//# sourceMappingURL=cards.spec.js.map