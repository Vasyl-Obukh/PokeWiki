export {};
const { init } = require('../utils/indexator');

function* run() {
  init();
  this.response.status = 200;
}

module.exports = {
  run
};