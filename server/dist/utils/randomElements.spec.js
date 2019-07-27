var deepFreeze = require('deep-freeze');
var getRandomElements = require('./randomElements');
describe('randomElements() tests', function () {
    var elements = [1, 2, 3, 4, 5, 6];
    deepFreeze(elements);
    test('Length of the returned array should the same as passed number argument', function () {
        expect(getRandomElements(elements, 4).length).toBe(4);
    });
    test('If original array have length smaller than passed number argument, should be returned array with the same elements', function () {
        expect(getRandomElements(elements, 8).length).toBe(6);
        expect(getRandomElements(elements, 8)).toEqual(expect.arrayContaining(elements));
    });
});
//# sourceMappingURL=randomElements.spec.js.map