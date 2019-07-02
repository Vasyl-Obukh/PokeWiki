const getData = require('../utils/getData');
const getPromises = require('../utils/getPromises');
const getRandomElements = require('../utils/randomElements');
const { getEntityData } = require('../selectors');
const { API_BASE } = require('../config');

let types;

const getTypes = () => getData(`${API_BASE}/type`);

function* getRelated() {
  const requestedTypes = this.query.types.split(',');

  if(!types) {
    types = (yield getTypes()).results;
  }

  const filteredTypes = types.filter(_ => requestedTypes.includes(_.name));
  const typesPromises = yield getPromises(filteredTypes);
  const related = (yield Promise.all(typesPromises))
    .map(_ => _.pokemon.map(_ => _.pokemon))
    .reduce((acc, val) => acc.concat(val), []);

  const relatedPromises = yield getPromises(getRandomElements(related, 5), getEntityData);
  const relatedPokemons = yield Promise.all(relatedPromises);

  this.body = relatedPokemons;
}

module.exports = {
  getRelated
};