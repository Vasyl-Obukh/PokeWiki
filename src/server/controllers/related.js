const getRandomElements = require('../utils/randomElements');
const { filterByTypes, createPipeline } = require('../filters');
const Indexing = require('../indexing');

const index = Indexing.instance;

function* getRelated() {
  const requestedTypes = this.query.types.split(',');
  const pokemons = yield index.getPokemons();
  const result = createPipeline(
    filterByTypes
  )({value: pokemons, filters: {types: requestedTypes}});

  this.body = getRandomElements(result.value, 5);
}

module.exports = {
  getRelated
};