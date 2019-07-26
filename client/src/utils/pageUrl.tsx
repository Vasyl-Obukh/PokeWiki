import paths from '../constants/paths';

const getPokemonPageUrl = (id: number) => paths.POKEMON_PAGE.replace(/:\w*$/, id + '');

export default getPokemonPageUrl;