const { SEARCH_CORRECTNESS } = require('../config/config');
require('string-compare');
import { PokemonShape } from '../interfaces/pokemon';

export interface FiltersInterface {
  search?: string,
  types?: string[],
  evoLevels?: number[]
}

interface DataInterface {
  filters: FiltersInterface,
  value: Required<PokemonShape>[]
}

export interface PipelineResult {
  value: Required<PokemonShape>[],
  filters: FiltersInterface
}

function filterBySearch(data: DataInterface): DataInterface {
  const { value, filters = {} } = data;
  const { search } = filters;
  if (!search || !value.length) return ({ value, filters });
  return {
    value: value.filter(_ => searchPokemons(_.name, search)),
    filters
  };
}

function filterByTypes(data: DataInterface): DataInterface {
  const { value, filters = {} } = data;
  const { types } = filters;
  if(!types || !types.length || !value.length) return ({ value, filters });
  return {
    value: value.filter(_ => _.types.some(_ => types.includes(_))),
    filters
  };
}

function filterByEvolutionLevels(data: DataInterface): DataInterface {
  const { value, filters = {} } = data;
  const { evoLevels } = filters;
  if (!evoLevels || !evoLevels.length || !value.length) return ({ value, filters });
  return {
    value: value.filter(_ => evoLevels.includes(_.evoLevel)),
    filters
  };
}

// @ts-ignore
const searchPokemons = (pokemonName: string, search: string): boolean => String.compare(pokemonName, search) > SEARCH_CORRECTNESS;
const createPipeline = (...ops) => ops.reduce((a, b) => ({value, filters}) => b(a({value, filters})));

module.exports = {
  filterBySearch,
  filterByTypes,
  searchPokemons,
  filterByEvolutionLevels,
  createPipeline
};