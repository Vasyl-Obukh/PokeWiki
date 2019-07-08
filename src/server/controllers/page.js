const indexator = require('../utils/indexator');

function* getPage() {
  this.body = yield indexator.getPokemon(this.params.id, true);
}

module.exports = {
  getPage
};