const { getTimestamp } = require('../utils/indexator');

function* checkHealth() {
  const timestamp = yield getTimestamp();

  this.response.status = timestamp ? 200 : 503;
}

module.exports = {
  checkHealth
};