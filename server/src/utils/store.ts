const Redis = require('ioredis');
const client = new Redis(6379, 'redis');

client.on('connect', () => console.log('Redis connected...'));
client.on('error', error => console.log(`Error happened in redis: ${error.message}`));

const getPokemon = (id: number | string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.get('timestamp')
      .then(timestamp => {
        return client.get(`${timestamp}_${id}`);
      })
      .then(data => resolve(JSON.parse(data)))
      .catch(error => reject(error));
  });
};

const getPokemons = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Promise.all([client.get('timestamp'), client.get('count')])
      .then(([timestamp, count]) => {
        const to: number = Number.parseInt(count);
        const list: Array<any> = [];

        for (let i: number = 1; i <= to; i++) {
          client.get(`${timestamp}_${i}`)
            .then(data => {
              const middle: object = JSON.parse(data);
              if(middle !== null) list.push(middle);
              if (i === to) resolve(list);
            });
        }
      })
      .catch(error => reject(error));
  });
};

module.exports = {
  getPokemon,
  getPokemons
};