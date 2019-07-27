jest.mock('../utils/store');
jest.mock('ioredis');
var store = require('../utils/store');
var getPage = require('./page').getPage;
describe('Page controller tests', function () {
    store.getPokemon.mockReturnValue({ id: 7 });
    var self = {
        params: { id: 99 }
    };
    test('Should call "getPokemon()" on first "next()" with argument from "this.params.id" ', function () {
        var gen = getPage.apply(self);
        expect(gen.next({ id: 33 }).value).toEqual({ id: 7 });
        expect(store.getPokemon).toHaveBeenCalledWith(99);
    });
});
//# sourceMappingURL=page.spec.js.map