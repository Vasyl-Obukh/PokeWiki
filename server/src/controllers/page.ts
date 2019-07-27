const store = require('../utils/store');

function* getPage() {
  this.body = yield store.getPokemon(this.params.id);
}

module.exports = {
  getPage
};