import paths from '../constants/paths';

const getPokemonPageUrl = id => paths.POKEMON_PAGE.replace(/:\w*$/, id);

export default getPokemonPageUrl;