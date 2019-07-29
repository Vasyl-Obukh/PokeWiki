const getRandomElements = require('../utils/randomElements');
const { filterByTypes, createPipeline } = require('../utils/filters');
const store = require('../utils/store');
import { PokemonShape } from '../interfaces/pokemon';
import { PipelineResult } from '../utils/filters';

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