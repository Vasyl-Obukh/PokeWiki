const getData = require('../utils/getData');
const getPromises = require('../utils/getPromises');
const { getEntityData } = require('../selectors');
const { API_BASE, SEARCH_CORRECTNESS, PAGE_LIMIT } = require('../config');
require('string-compare');
const Indexing = require('../indexing');
const index = Indexing.instance;

const COUNT = 964;

// const _pipe = (a, b) => (arg) => b(a(arg));
// const pipe = (...ops) => ops.reduce(_pipe);
//
// function* filterBySearch({ prev = [], filters }) {
//   const { search } = filters;
//   let pokemonsList;
//
//   if (!search) return ({ prev, filters });
//
//   if (prev.length) {
//     pokemonsList = prev;
//   } else {
//     pokemonsList = (yield getData(`${API_BASE}/pokemon?limit=${COUNT}`)).results;
//   }
//
//   return ({
//     prev: pokemonsList.filter(_ => searchPokemons(_.name, search)),
//     filters
//   });
// }
//
// function* filterByTypes({prev = [], filters}) {
//   const { types } = filters;
//   let pokemonsList;
//
//   if(!types.length) return ({ prev, filters });
//
//   if (prev.length) {
//     pokemonsList = prev.filter(_ => _.types.some(_ => filters.includes(_)));
//   } else {
//     const requestedElements = [];
//     for (let type of types) {
//       const a = (yield getData(`${API_BASE}/type/${type}`)).pokemon.map(_ => _.pokemon);
//       requestedElements.push(...a);
//     }
//   }
// }











let count;
let pokemonsFullList;
let types = {};

function* getCards() {
  if (index.running) {
    this.status = 503;
  } else {
    const offset = (this.params.page - 1) * PAGE_LIMIT;
    const { search, elements } = JSON.parse(this.request.query.filters);
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
    } else if (elements.length) {
      const requestedTypes = elements.split(',');
      const requestedElements = [];
      for (let type of requestedTypes) {
        if (!types[type]) {
          types[type] = (yield getData(`${API_BASE}/type/${type}`)).pokemon.map(_ => _.pokemon);
        }
        requestedElements.push(...types[type]);
      }

      count = requestedElements.length;
      results = requestedElements.slice(offset, +offset + PAGE_LIMIT);
    } else {
      results = (yield getData(`${API_BASE}/pokemon?offset=${offset}&&limit=${PAGE_LIMIT}`)).results;
    }

    const promises = getPromises(results, getEntityData);
    const pokemonsData = yield Promise.all(promises);

    this.body = {
      elements: pokemonsData,
      count: count
    };
  }

}

const searchPokemons = (pokemonName, search) => {
  const coef = String.compare(pokemonName, search);
  return coef > SEARCH_CORRECTNESS;
};

module.exports = {
  getCards
};