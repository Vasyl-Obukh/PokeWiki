const Indexing = require('../indexing');

const indexing = Indexing.instance;

const getPage = function* () {
  if (indexing.running) {
    this.status = 503;
  } else {
    this.body = yield indexing.getPokemon(this.params.id, true);
  }
};

module.exports = {
  getPage
};