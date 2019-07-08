const redis = require('redis');
const threads = require('worker_threads');
const { Worker } = threads;

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
}

module.exports = Indexing;