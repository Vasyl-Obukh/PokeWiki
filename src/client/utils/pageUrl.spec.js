import getPokemonPageUrl from './pageUrl';

describe('getPokemonPageUrl tests', () => {
  test('Should return url to page with specific id', () => {
    const id = 7;
    expect(getPokemonPageUrl(id)).toBe('/pokemon/7');
  });
});