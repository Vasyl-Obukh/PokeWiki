const redis = require('redis');
const threads = require('worker_threads');
const { Worker } = threads;
const { getEntityData } = require('./selectors');

let singleton = Symbol();
let singletonEnforcer = Symbol();

class Indexing {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw 'Instantiation failed: use Singleton.instance instead of new.';
    }
    this._running = false;
    this._worker = new Worker(__dirname + '/indexingWorker.js');
    this._client = redis.createClient();
    this._count = 0;
  }

  get running() {
    return this._running;
  }

  set running(value) {
    this._running = !!value;
  }

  get worker() {
    return this._worker;
  }

  get client() {
    return this._client;
  }

  get count() {
    return this._count;
  }

  set count(value) {
    const formattedValue = parseInt(value);
    this._count = formattedValue > 0 ? formattedValue : 0;
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Indexing(singletonEnforcer);
    }
    return this[singleton];
  }

  static set instance(v) {
    throw 'Can\'t change constant property!';
  }

  configure = () => {
    this.client.on('connect', () => console.log('Redis connected...'));
    this.client.on('error', error => console.log(`Error happened in redis: ${error.message}`));

    this.worker.on('message', message => {
      if (message.type) {
        switch (message.type) {
          case 'fulfilled':
            this.running = false;
            console.log('Indexing finished...');
          case 'data-chunk':
            const data = message.value;
            if (data) {
              data.forEach(el => {
                this.client.set(el.id, JSON.stringify(el));
                this.count = el.id;
              })
            }
        }
      } else {
        console.log(`Worker message: ${message}`);
      }
    });

    this.worker.on('exit', () => {
      console.log('Indexing worker finished...');
      this.running = false;
    });
  };

  start = () => {
    this.worker.postMessage({type: 'run'});
    this.running = true;
    console.log('Indexing started...');
  };

  startWithInterval = (minutes) => {
    this.start();
    setInterval(
      this.start,
      minutes * 60 * 1000
    );
  };

  getPokemons = (from = 1, to = this.count) => {
    return new Promise((resolve, reject) => {
      const list = [];
      for (let i = from; i <= to; i++) {
        this.client.get(i, (error, data) => {
          if (error) reject(error);

          list.push(JSON.parse(data));
          if (i === to) resolve(list);
        })
      }
    });
  };

  getPokemon = (id, full = false) => {
    return new Promise((resolve, reject) => {
      this.client.get(id, (error, data) => {
        if (error) reject(error);
        const result = JSON.parse(data);
        resolve(full ? result : result.map(getEntityData));
      });
    });
  }
}

module.exports = Indexing;