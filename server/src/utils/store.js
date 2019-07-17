const Redis = require('ioredis');

const client = new Redis(6379, 'redis');

client.on('connect', () => console.log('Redis connected...'));
client.on('error', error => console.log(`Error happened in redis: ${error.message}`));

/*TODO: fix callback hell*/

const getPokemon = id => {
  return new Promise((resolve, reject) => {
    client.get('timestamp', (error, timestamp) => {
      if (error) reject(error);

      client.get(`${timestamp}_${id}`, (error, data) => {
        if (error) reject(error);

        resolve(JSON.parse(data));
      });
    });
  });
};

const getPokemons = () => {
  return new Promise((resolve, reject) => {
    client.get('timestamp', (error, timestamp) => {
      if (error) reject(error);

      client.get('count', (error, count) => {
        if (error) reject(error);

        const to = Number.parseInt(count);
        const list = [];

        for (let i = 1; i <= to; i++) {
          client.get(`${timestamp}_${i}`, (error, data) => {
            if (error) reject(error);

            const middle = JSON.parse(data);
            if(middle !== null) list.push(middle);
            if (i === to) resolve(list);
          });
        }
      });
    });
  });
};

module.exports = {
  getPokemon,
  getPokemons
};