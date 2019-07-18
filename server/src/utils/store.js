const Redis = require('ioredis');

const client = new Redis(6379, 'redis');

client.on('connect', () => console.log('Redis connected...'));
client.on('error', error => console.log(`Error happened in redis: ${error.message}`));

/*TODO: fix callback hell*/

const getPokemon = id => {
  return new Promise((resolve, reject) => {
    client.get('timestamp')
      .then(timestamp => {
        return client.get(`${timestamp}_${id}`);
      })
      .then(data => resolve(JSON.parse(data)))
      .catch(error => reject(error));
  });
};

const getPokemons = () => {
  return new Promise((resolve, reject) => {
    Promise.all([client.get('timestamp'), client.get('count')])
      .then(([timestamp, count]) => {
        const to = Number.parseInt(count);
        const list = [];

        for (let i = 1; i <= to; i++) {
          client.get(`${timestamp}_${i}`)
            .then(data => {
              const middle = JSON.parse(data);
              if(middle !== null) list.push(middle);
              if (i === to) resolve(list);
            });
        }
      })
      .catch(error => reject(error));
    // client.get('timestamp', (error, timestamp) => {
    //   if (error) reject(error);
    //
    //   client.get('count', (error, count) => {
    //     if (error) reject(error);
    //
    //     const to = Number.parseInt(count);
    //     const list = [];
    //
    //     for (let i = 1; i <= to; i++) {
    //       client.get(`${timestamp}_${i}`, (error, data) => {
    //         if (error) reject(error);
    //
    //         const middle = JSON.parse(data);
    //         if(middle !== null) list.push(middle);
    //         if (i === to) resolve(list);
    //       });
    //     }
    //   });
    // });
  });
};

module.exports = {
  getPokemon,
  getPokemons
};