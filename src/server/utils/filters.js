const { SEARCH_CORRECTNESS } = require('../config/config');
require('string-compare');

function filterBySearch({value, filters = {}}) {
  const { search } = filters;
  if (!search || !value.length) return ({ value, filters });
  return {
    value: value.filter(_ => searchPokemons(_.name, search)),
    filters
  };
}

function filterByTypes({value, filters = {}}) {
  const { types } = filters;
  if(!types || !types.length || !value.length) return ({ value, filters });
  return {
    value: value.filter(_ => _.types.some(_ => types.includes(_))),
    filters
  };
}

function filterByEvolutionLevels({value, filters = {}}) {
  const { evoLevels } = filters;
  if (!evoLevels || !evoLevels.length || !value.length) return ({ value, filters });
  return {
    value: value.filter(_ => evoLevels.includes(_.evoLevel)),
    filters
  };
}

const searchPokemons = (pokemonName, search) => String.compare(pokemonName, search) > SEARCH_CORRECTNESS;
const createPipeline = (...ops) => ops.reduce((a, b) => ({value, filters}) => b(a({value, filters})));

module.exports = {
  filterBySearch,
  filterByTypes,
  searchPokemons,
  filterByEvolutionLevels,
  createPipeline
};