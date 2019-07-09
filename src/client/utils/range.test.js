import range from './range';

describe('range function', () => {
  it('range() success', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(range(1, 5, 3)).toEqual([1, 4]);
  });
});