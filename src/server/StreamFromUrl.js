const { Readable } = require('stream');
const axios = require('axios');

// const getEntityFullData = _ => ({
//   ...getEntityData(_),
//   baseExperience: _.base_experience,
//   height: _.height,
//   weight: _.weight,
//   stats: _.stats ? _.stats.map(_ => ({ base: _.base_stat, name: _.stat.name })) : []
// });
//
// const getEntityData = _ => ({
//   name: _.name,
//   id: _.id,
//   thumb: _.sprites ? _.sprites.front_default : '',
//   abilities: _.abilities ? _.abilities.map(_ => _.ability.name) : [],
//   types: _.types ? _.types.map(_ => _.type.name) : []
// });

class StreamFromUrl extends Readable {
  constructor(array, concurrentCount = 1) {
    super({ objectMode: true });
    this.concurrent = concurrentCount;
    this.total = array.length;
    this.todo = array;
    this.index = 0;
  }

  _read() {
    if (this.index < this.total) {
      const promises = this.todo
        .slice(this.index, this.index + this.concurrent)
        .map(_ => axios.get(_).then(_ => _.data));

      Promise.all(promises)
        .then(data => {
          console.log(`Data received: ${data.length} element(s) of type ${typeof data[0]}`);
          this.push(data);
        })
        .catch(error => console.error(`error: ${error.message}`));

      this.index += this.concurrent;
    } else {
      this.push(null);
    }
  }
}

module.exports = StreamFromUrl;

// const urls = [
//   'https://pokeapi.co/api/v2/pokemon/1',
//   'https://pokeapi.co/api/v2/pokemon/2',
//   'https://pokeapi.co/api/v2/pokemon/3'
// ];
//
// const pokemons = [];
// const urlStream = new StreamFromUrl(urls, 2);
//
// urlStream.on('data', (chunk) => {
//   console.log('chunk received: ');
//   const filteredArray = chunk.map(getEntityFullData);
//   pokemons.push(...filteredArray);
//   console.log({pokemons})
// });
//
// urlStream.on('end', () => console.log('done!'));