var Redis = require('ioredis');
var client = new Redis(6379, 'redis');
client.on('connect', function () { return console.log('Redis connected...'); });
client.on('error', function (error) { return console.log("Error happened in redis: " + error.message); });
var getPokemon = function (id) {
    return new Promise(function (resolve, reject) {
        client.get('timestamp')
            .then(function (timestamp) {
            return client.get(timestamp + "_" + id);
        })
            .then(function (data) { return resolve(JSON.parse(data)); })
            .catch(function (error) { return reject(error); });
    });
};
var getPokemons = function () {
    return new Promise(function (resolve, reject) {
        Promise.all([client.get('timestamp'), client.get('count')])
            .then(function (_a) {
            var timestamp = _a[0], count = _a[1];
            var to = Number.parseInt(count);
            var list = [];
            var _loop_1 = function (i) {
                client.get(timestamp + "_" + i)
                    .then(function (data) {
                    var middle = JSON.parse(data);
                    if (middle !== null)
                        list.push(middle);
                    if (i === to)
                        resolve(list);
                });
            };
            for (var i = 1; i <= to; i++) {
                _loop_1(i);
            }
        })
            .catch(function (error) { return reject(error); });
    });
};
module.exports = {
    getPokemon: getPokemon,
    getPokemons: getPokemons
};
//# sourceMappingURL=store.js.map