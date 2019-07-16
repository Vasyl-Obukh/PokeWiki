const threads = require('worker_threads');
const { Worker } = threads;
const worker = new Worker(__dirname + '/indexationWorker.js');
const Redis = require('ioredis');

const client = new Redis(6379, "redis");

const state = {
  callbacks: { 'end': [] },
  running: false,
  count: 0,
};

client.on('connect', () => console.log('Redis connected...'));
client.on('error', error => console.log(`Error happened in redis: ${error.message}`));

const messageHandler = message => {
  if (message.type) {
    switch (message.type) {
      case 'data':
        message.value.forEach(el => {
          client.set(el.id, JSON.stringify(el));
          state.count = el.id > state.count ? el.id : state.count;
        });
        break;
      case 'fulfilled':
        state.running = false;
        state.callbacks['end'].forEach(cb => cb());
        state.callbacks['end'] = [];
        console.log('Indexation finished...');
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
  console.log('Indexation started...');
}

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

const indexationPromise = (next) => new Promise(res =>
  addIndexListening('end', () => res(next))
);

function* interceptor(next) {
  if (state.running) yield indexationPromise();
  yield next;
}

const getPokemon = id => {
  return new Promise((resolve, reject) => {
    client.get(id, (error, data) => {
      if (error) reject(error);

      resolve(JSON.parse(data));
    });
  });
};

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

module.exports = {
  state,
  init,
  startWithInterval,
  messageHandler,
  addIndexListening,
  indexationPromise,
  interceptor,
  getPokemon,
  getPokemons,
};