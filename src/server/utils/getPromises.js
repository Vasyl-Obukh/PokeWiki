const getData = require('./getData');

module.exports = (data, cb = e => e) => {
  const promises = [];
  data.forEach(_ => {
    promises.push(getData(_.url, cb));
  });
  return promises;
};