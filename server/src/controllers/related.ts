const getRandomElements = require('../utils/randomElements');
const { filterByTypes, createPipeline } = require('../utils/filters');
const store = require('../utils/store');

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

interface FiltersInterface {
  search?: string,
  types?: string[],
  evoLevels?: number[]
}

interface PipelineResult {
  value: Required<PokemonShape>[],
  filters: FiltersInterface
}

function* getRelated() {
  const requestedTypes: string[] = this.query.types.split(',');
  const filters = {types: requestedTypes};
  const pokemons: Required<PokemonShape>[] = yield store.getPokemons();
  const result: PipelineResult = createPipeline(
    filterByTypes
  )({value: pokemons, filters});

  this.body = getRandomElements(result.value, 5);
}

module.exports = {
  getRelated
};