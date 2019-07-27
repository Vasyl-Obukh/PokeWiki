export {}
const threads = require('worker_threads');
const { Worker } = threads;
const worker = new Worker(__dirname + '/indexationWorker.js');
const Redis = require('ioredis');

const client = new Redis(6379, 'redis');

const state: {[key: string]: number} = {
  count: 0,
  countOld: 0,
  timestamp: 0,
  timestampOld: 0
};

client.on('connect', () => console.log('Redis connected...'));
client.on('error', error => console.log(`Error happened in redis: ${error.message}`));

const updateState = (): void => {
  state.countOld = state.count;
  state.count = 0;
  state.timestampOld = state.timestamp;
};

const deleteOldData = (): void => {
  if (state.timestampOld) {
    const timestamp: number = state.timestampOld;
    for (let i: number = 1; i <= state.countOld; i++) {
      client.del(`${timestamp}_${i}`);
    }
  }
};

interface Message {
  type?: string,
  value?: Array<any>
}

const messageHandler = <T extends Message>(message: T): void => {
  if (message.type) {
    switch (message.type) {
      case 'data':
        message.value.forEach(el => {
          client.set(`${state.timestamp}_${el.id}`, JSON.stringify(el));
          state.count = el.id > state.count ? el.id : state.count;
        });
        break;
      case 'fulfilled':
        client.set('timestamp', state.timestamp);
        client.set('count', state.count);
        deleteOldData();
        updateState();
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
  state.timestamp = Date.now();
  console.log('Indexation started...');
}

const getTimestamp = () => client.get('timestamp');

module.exports = {
  state,
  init,
  messageHandler,
  getTimestamp,
  updateState,
  deleteOldData
};