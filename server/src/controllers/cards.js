const { filterBySearch, filterByTypes, filterByEvolutionLevels, createPipeline } = require('../utils/filters');
const { PAGE_LIMIT } = require('../config/config');
const indexator = require('../utils/indexator');

function* getCards() {
  const offset = (this.params.page - 1) * PAGE_LIMIT;
  const filters = JSON.parse(this.request.query.filters);

  const pokemons = yield indexator.getPokemons();
  const result = createPipeline(
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