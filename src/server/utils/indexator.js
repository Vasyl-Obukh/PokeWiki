const threads = require('worker_threads');
const { Worker } = threads;
const { getEntityData } = require('./selectors');
const worker = new Worker(__dirname + '/indexingWorker.js');

const state = {
  callbacks: { 'end': [] },
  running: false,
  count: 0,
};

const Redis = require('ioredis');
const client = new Redis();

client.on('connect', () => console.log('Redis connected...'));
client.on('error', error => console.log(`Error happened in redis: ${error.message}`));

const messageHandler = message => {
  if (message.type) {
    switch (message.type) {
      case 'fulfilled':
        state.running = false;
        state.callbacks['end'].forEach(cb => cb());
        console.log('Indexing finished...');
        break;
      case 'data':
        if (message.value) {
          message.value.forEach(el => {
            client.set(el.id, JSON.stringify(el));
            state.count = el.id > state.count ? el.id : state.count;
          });
        }
        break;
      default:
        console.error(`Worker: unknown message type: ${message.type}`);
    }
  } else {
    console.log(`Worker message: ${message}`);
  }
};

worker.on('message', messageHandler);

function init() {
  worker.postMessage({type: 'run'});
  state.running = true;
  console.log('Indexing started...');
}

// init._callbacks = callbacks;
// init._running = running;

const startWithInterval = (minutes) => {
  init();
  setInterval(
    init,
    minutes * 60 * 1000
  );
};

const addIndexListening = (name, cb) => {
  state.callbacks[name].push(cb);
};

function* interceptor (next) {
  if (state.running) yield indexingPromise();
  yield next;
}

const indexingPromise = () =>  new Promise(res => addIndexListening('end', () => res()));

const getPokemons = (from = 1, to = state.count) => {
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
  init,
  state,
  startWithInterval,
  addIndexListening,
  interceptor,
  getPokemon,
  getPokemons,
  indexingPromise,
  messageHandler
};