import getPokemonPageUrl from './pageUrl';

describe('getPokemonPageUrl tests', () => {
  test('Should work correct', () => {
    const id = 7;
    expect(getPokemonPageUrl(id)).toBe('/pokemon/7');
  });
});