const Indexing = require('../indexing');

const indexing = Indexing.instance;

const getPage = function* () {
  this.body = yield indexing.getPokemon(this.params.id, true);
};

module.exports = {
  getPage
};