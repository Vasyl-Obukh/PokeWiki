const { filterBySearch, filterByTypes, filterByEvolutionLevels, createPipeline } = require('../utils/filters');
const { PAGE_LIMIT } = require('../config/config');
const store = require('../utils/store');

interface FiltersInterface {
  search?: string,
  types?: string[],
  evoLevels?: number[]
}

interface Stat {
  base: number,
  name: string
}

export interface BasicPokemonShape {
  id: number,
  name: string,
  thumb: string | null
}

export interface PokemonShape extends BasicPokemonShape {
  baseExperience?: number,
  height?: number,
  weight?: number,
  stats?: Stat[],
  types: string[],
  abilities: string[],
  evoLevel: number
}

interface PipelineResult {
  value: Required<PokemonShape>[],
  filters: FiltersInterface
}

function* getCards() {
  const offset: number = (this.params.page - 1) * PAGE_LIMIT;
  const filters: FiltersInterface = JSON.parse(this.request.query.filters);

  const pokemons: Required<PokemonShape>[] = yield store.getPokemons();

  const result: PipelineResult = createPipeline(
    filterBySearch,
    filterByTypes,
    filterByEvolutionLevels
  )({value: pokemons, filters});

  this.body = {
    elements: result.value.slice(offset, offset + PAGE_LIMIT),
    count: result.value.length
  };
}

module.exports = {
  getCards
};