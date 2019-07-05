const getData = require('../utils/getData');
const getPromises = require('../utils/getPromises');
const { getEntityData } = require('../selectors');
const { API_BASE, SEARCH_CORRECTNESS } = require('../config');
require('string-compare');

let count;
let pokemonsFullList;
let types = {};

function* getCards() {
  const { offset, limit, search, elements } = this.request.query;
  let results;

  if (!count) {
    console.log('Count of pokemons before cashing: ', `count = ${count}`);
    count = (yield getData(`${API_BASE}/pokemon`)).count;
    console.log('Count of pokemons after cashing: ', `count = ${count}`);
  }

  if (search) {
    if (!pokemonsFullList) {
      console.log('Pokemons list before cashing: ', `list length = ${pokemonsFullList ? pokemonsFullList.length : 0}`);
      pokemonsFullList = (yield getData(`${API_BASE}/pokemon?limit=${count}`)).results;
      console.log('Pokemons list after cashing: ', `list length = ${pokemonsFullList ? pokemonsFullList.length : 0}`);
    }
    results = pokemonsFullList.filter(_ => searchPokemons(_.name, search));
  } else if (elements) {
    const requestedTypes = elements.split(',');
    const requestedElements = [];
    for (let type of requestedTypes) {
      if (!types[type]) {
        types[type] = (yield getData(`${API_BASE}/type/${type}`)).pokemon.map(_ => _.pokemon);
      }
      requestedElements.push(...types[type]);
    }
    count = requestedElements.length;
    results = requestedElements.slice(offset, +offset + +limit);
  } else {
    results = (yield getData(`${API_BASE}/pokemon?offset=${offset}&&limit=${limit}`)).results;
  }

  const promises = getPromises(results, getEntityData);
  const pokemonsData = yield Promise.all(promises);

  this.body = {
    elements: pokemonsData,
    count: count
  };
}

const searchPokemons = (pokemonName, search) => {
  const coef = String.compare(pokemonName, search);
  return coef > SEARCH_CORRECTNESS;
};

module.exports = {
  getCards
};