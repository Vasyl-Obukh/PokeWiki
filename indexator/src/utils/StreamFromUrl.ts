const { Readable } = require('stream');
const axios = require('axios');

class StreamFromUrl extends Readable {
  private readonly concurrent: number;
  private readonly total: number;
  private readonly todo: string[];
  private index: number;

  constructor(array: string[], concurrentCount: number = 1) {
    super({ objectMode: true });
    this.concurrent = concurrentCount;
    this.total = array.length;
    this.todo = array;
    this.index = 0;
  }

  _read() {
    if (this.index < this.total) {
      const promises: Promise<any>[] = this.todo
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