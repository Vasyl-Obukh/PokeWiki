const redis = require('redis');
const threads = require('worker_threads');
const { Worker } = threads;
const { getEntityData } = require('./selectors');

const worker = new Worker(__dirname + '/indexingWorker.js');
const client = redis.createClient();
const callbacks = { 'end': [] };
let running = false;
let count = 0;

client.on('connect', () => console.log('Redis connected...'));
client.on('error', error => console.log(`Error happened in redis: ${error.message}`));

worker.on('message', message => {
  if (message.type) {
    switch (message.type) {
      case 'fulfilled':
        running = false;
        callbacks['end'].forEach(cb => cb());
        console.log('Indexing finished...');
        break;
      case 'data-chunk':
        if (message.value) {
          message.value.forEach(el => {
            client.set(el.id, JSON.stringify(el));
            count = el.id;
          });
        }
    }
  } else {
    console.log(`Worker message: ${message}`);
  }
});

const start = () => {
  worker.postMessage({type: 'run'});
  running = true;
  console.log('Indexing started...');
};

const startWithInterval = (minutes) => {
  start();
  setInterval(
    start,
    minutes * 60 * 1000
  );
};

const addIndexListening = (name, cb) => {
  callbacks[name].push(cb);
  console.log(callbacks[name]);
};

function* interceptor (next) {
  if (running) yield indexingPromise();
  yield next;
}

const indexingPromise = () => {
  return new Promise(res => addIndexListening('end', () => {
    res();
  }));
};

const getPokemons = (from = 1, to = count) => {
  return new Promise((resolve, reject) => {
    const list = [];
    for (let i = from; i <= to; i++) {
      client.get(i, (error, data) => {
        if (error) reject(error);

        list.push(JSON.parse(data));
        if (i === to) resolve(list);
      });
    }
  });
};

const getPokemon = (id, full = false) => {
  return new Promise((resolve, reject) => {
    client.get(id, (error, data) => {
      if (error) reject(error);
      const result = JSON.parse(data);
      resolve(full ? result : result.map(getEntityData));
    });
  });
};

module.exports = {
  start,
  startWithInterval,
  interceptor,
  getPokemon,
  getPokemons
};