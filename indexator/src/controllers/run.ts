const { init } = require('../utils/indexator');

function* runIndexation() {
  console.log('get here')
  init();
  this.response.status = 200;
}

module.exports = {
  runIndexation
};