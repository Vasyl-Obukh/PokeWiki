const deepFreeze = require('deep-freeze');
const getRandomElements = require('./randomElements');

describe('randomElements() tests', () => {
  const elements = [1, 2, 3, 4, 5, 6];
  deepFreeze(elements);

  test('Length of the returned array should the same as passed number argument', () => {
    expect(getRandomElements(elements, 4).length).toBe(4);
  });

  test('If original array have length smaller than passed number argument, should be returned array with the same elements', () => {
    expect(getRandomElements(elements, 8).length).toBe(6);
    expect(getRandomElements(elements, 8)).toEqual(
      expect.arrayContaining(elements),
    );
  });
});