const { PAGE_LIMIT } = require('../config');
const { filterBySearch, filterByTypes, createPipeline } = require('../filters');
const Indexing = require('../indexing');

const index = Indexing.instance;

function* getCards() {
  if (index.running) {
    this.status = 503;
  } else {
    const offset = (this.params.page - 1) * PAGE_LIMIT;
    const filters = JSON.parse(this.request.query.filters);

    const pokemons = yield index.getPokemons();
    const result = createPipeline(
      filterBySearch,
      filterByTypes
    )({value: pokemons, filters});

    this.body = {
      elements: result.value.slice(offset, offset + PAGE_LIMIT),
      count: result.value.length
    };
  }
}

module.exports = {
  getCards
};