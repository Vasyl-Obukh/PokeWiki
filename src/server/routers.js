const https = require('https');
const { API_BASE } = require('./config');
const router = require('koa-router')(
  {prefix: '/api'}
);

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
        console.log(JSON.parse(fullData ));
        resolve(cb(JSON.parse(fullData )));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};

const getDesiredFields = _ => ({
  name: _.name,
  id: _.id,
  thumb: _.sprites.front_default,
  abilities: _.abilities.map(_ => _.ability.name),
  baseExperience: _.base_experience,
  height: _.height,
  weight: _.weight,
  types: _.types.map(_ => _.type.name),
  stats: _.stats.map(_ => ({ base: _.base_stat, name: _.stat.name }))
});

router.get('/', function* () {
  let promises = [];
  const { offset, limit } = this.request.query;
  const pokemons = yield getData(API_BASE + '/pokemon?offset=' + offset + '&&limit=' + limit);
  pokemons.results.forEach(_ => {
    promises.push(getData(_.url, getDesiredFields));
  });
  const elements = yield Promise.all(promises);
  //console.log({pokemons});
  this.body = {
    elements,
    count: pokemons.count
  };
});

module.exports = router;
