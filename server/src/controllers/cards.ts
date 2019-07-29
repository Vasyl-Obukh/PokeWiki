const { filterBySearch, filterByTypes, filterByEvolutionLevels, createPipeline } = require('../utils/filters');
const { PAGE_LIMIT } = require('../config/config');
const store = require('../utils/store');
import { PokemonShape } from '../interfaces/pokemon';
import { FiltersInterface, PipelineResult } from '../utils/filters';

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