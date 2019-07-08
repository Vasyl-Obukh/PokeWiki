const threads = require('worker_threads');
const axios = require('axios');
const StreamFromUrl = require('./StreamFromUrl');
const { getEntityFullData } = require('./selectors');
const { API_BASE, CONCURRENT_COUNT } = require('./config');

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

  axios.get(`${API_BASE}/pokemon?limit=-1`).then(responce => {
    const urls = responce.data.results.map(_ => _.url);
    fetching(urls);
  });
};

const fetching = (urls) => {
  const urlStream = new StreamFromUrl(urls, CONCURRENT_COUNT);

  urlStream.on('data', (chunk) => {
    console.log('Indexing worker: chunk received');
    const filteredArray = chunk.map(getEntityFullData);
    threads.parentPort.postMessage({type: 'data-chunk', value: filteredArray});
  });

  urlStream.on('end', () => {
    console.log('Indexing worker: Fetching fulfilled...');
    threads.parentPort.postMessage({type: 'fulfilled'});
  });
};