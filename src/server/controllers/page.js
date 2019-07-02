const getData = require('../utils/getData');
const { getEntityFullData } = require('../selectors');
const { API_BASE } = require('../config');

const getPage = function* () {
  const pokemon = yield getData(`${API_BASE}/pokemon/${this.params.id}`);
  const result = getEntityFullData(pokemon);
  this.body = result;
};

module.exports = {
  getPage
};