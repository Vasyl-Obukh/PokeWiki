const getRandomElements = require('../utils/randomElements');
const { filterByTypes, createPipeline } = require('../filters');
const indexator = require('../indexator');

function* getRelated() {
  const requestedTypes = this.query.types.split(',');
  const pokemons = yield indexator.getPokemons();
  const result = createPipeline(
    filterByTypes
  )({value: pokemons, filters: {types: requestedTypes}});

  this.body = getRandomElements(result.value, 5);
}

module.exports = {
  getRelated
};