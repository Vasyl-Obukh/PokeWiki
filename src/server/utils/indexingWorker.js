const threads = require('worker_threads');
const axios = require('axios');
const StreamFromUrl = require('./StreamFromUrl');
const { getEntityFullData } = require('./selectors');
const { API_BASE, CONCURRENT_COUNT } = require('../config/config');

threads.parentPort.on('message', data => {
  switch (data.type) {
    case 'run':
      run();
      break;
    default:
      console.log(`Indexing worker: unknown message type: ${data.type}`);
  }
});

const run = () => {
  console.log('Indexing worker: Data fetching started...');

  axios.get(`${API_BASE}/pokemon?limit=-1`)
    .then(response => {
      const urls = response.data.results.map(_ => _.url);
      return fetching(urls, chunk => chunk.map(getEntityFullData));
    })
    .then(updateWithEvoLevel)
    .then(data => {
      //console.log({data: data.slice(0,5)});
      threads.parentPort.postMessage({type: 'data', value: data});
    })
    .then(() => {
      console.log('Indexing worker: Fetching fulfilled...');
      threads.parentPort.postMessage({type: 'fulfilled'});
    })
    .catch(error => console.error(`Indexing worker error: ${error.message}`));
};

const updateWithEvoLevel = data => {
  return axios.get(`${API_BASE}/evolution-chain?limit=-1`)
    .then(response => {
      const urls = response.data.results.map(_ => _.url);

      return fetching(urls, chunk => {
        let result = [];

        chunk.forEach(elem => {
          const evoChain = getEvolutionChain(elem.chain);

          evoChain.forEach((level, id) => {
            level.forEach(name => {
              const item = data.find(_ => _.name === name);
              if (item) result.push({...item, evoLevel: id + 1, evoChain});
            });
          });
        });

        return result;
      });
    });
};

const getEvolutionChain = (chain) => {
  const result = [[chain.species.name]];
  const recur = (chain, id = 1) => {
    if (chain.evolves_to.length) {
      chain.evolves_to.map(elem => {
        result[id] = result[id] ? [...result[1], elem.species.name] : [elem.species.name];
        recur(elem, id + 1);
      });
    }
  };
  recur(chain);
  return result;
};

const fetching = (urls, cb) => {
  return new Promise((resolve, reject) => {
    const urlStream = new StreamFromUrl(urls, CONCURRENT_COUNT);
    const result = [];

    urlStream.on('data', (chunk) => {
      console.log('Indexing worker: chunk received');
      result.push(...cb(chunk));
    });

    urlStream.on('error', error => reject(error));

    urlStream.on('end', () => {
      resolve(result);
    });
  });
};