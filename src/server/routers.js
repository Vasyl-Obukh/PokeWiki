const https = require('https');
const { API_BASE } = require('./config');
const router = require('koa-router')(
  {prefix: '/api'}
);

const COUNT = 964;
const CORRECTNESS = .9;

const getData = (url, cb = e => e) => {
  return new Promise(function(resolve, reject){
    let req = https.get(url, (res) => {
      let fullData = '';
      res.on('data', (data) => {
        try{
          fullData += data;
        } catch(ex) {
          reject(ex);
        }
      });
      res.on('end', function () {
        resolve(cb(JSON.parse(fullData)));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};

const getEntityFullData = _ => ({
  ...getEntityData(_),
  baseExperience: _.base_experience,
  height: _.height,
  weight: _.weight,
  stats: _.stats.map(_ => ({ base: _.base_stat, name: _.stat.name }))
});

const getEntityData = _ => ({
  name: _.name,
  id: _.id,
  thumb: _.sprites.front_default,
  abilities: _.abilities.map(_ => _.ability.name),
  types: _.types.map(_ => _.type.name)
});

const getPromises = (data, cb = e => e) => {
  const promises = [];
  data.forEach(_ => {
    promises.push(getData(_.url, cb));
  });
  return promises;
};

const searchPokemons = (pokemonName, search) => {
  if(pokemonName.toLowerCase() === search.toLowerCase()) {
    return true;
  }
  let c = 0;
  for(let _ of pokemonName.split('')) {
    if (search.includes(_)) {
      c++;
    }
  }
  const coef = c / (pokemonName.length + search.length - c);
  return coef > CORRECTNESS;
};

router.get('/', function* () {
  const { offset, limit, search, evoLevels, elements } = this.request.query;
  let results;
  if(search) {
    let pokemonsFullList = (yield getData(`${API_BASE}/pokemon?limit=${COUNT}`)).results;
    results = pokemonsFullList.filter(_ => searchPokemons(_.name, search));
  } else {
    results = (yield getData(API_BASE + '/pokemon?offset=' + offset + '&&limit=' + limit)).results;
  }
  const promises = getPromises(results, getEntityData);
  const pokemonsData = yield Promise.all(promises);
  this.body = {
    elements: pokemonsData,
    count: COUNT
  };
});

const getRandomElements = (elements, n) => {
  return [...Array(n)].map(() => elements[Math.floor(Math.random()*elements.length)]);
};

router.get('/pokemon/:id', function* () {
  const pokemon = yield getData(`${API_BASE}/pokemon/${this.params.id}`);
  const result = getEntityFullData(pokemon);
  const types = (yield getData(`${API_BASE}/type`)).results.filter(_ => result.types.includes(_.name));
  const typesPromises = yield getPromises(types);
  const related = (yield Promise.all(typesPromises)).map(_ => _.pokemon.map(_ => _.pokemon)).reduce((acc, val) => acc.concat(val), []);
  const relatedPromises = yield getPromises(getRandomElements(related, 5), getEntityData);
  const relatedPokemons = yield Promise.all(relatedPromises);
  this.body = {result, relatedPokemons};
});

module.exports = router;
