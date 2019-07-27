var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var threads = require('worker_threads');
var axios = require('axios');
var StreamFromUrl = require('./StreamFromUrl');
var getEntityFullData = require('./selectors').getEntityFullData;
var _a = require('../config/config'), API_BASE = _a.API_BASE, CONCURRENT_COUNT = _a.CONCURRENT_COUNT;
threads.parentPort.on('message', function (data) {
    switch (data.type) {
        case 'run':
            run();
            break;
        default:
            console.log("Indexing worker: unknown message type: " + data.type);
    }
});
var run = function () {
    console.log('Indexing worker: Data fetching started...');
    axios.get(API_BASE + "/pokemon?limit=-1")
        .then(function (response) {
        var urls = response.data.results.map(function (_) { return _.url; });
        return fetching(urls, function (chunk) { return chunk.map(getEntityFullData); });
    })
        .then(updateWithEvoLevel)
        .then(function (data) {
        threads.parentPort.postMessage({ type: 'data', value: data });
    })
        .then(function () {
        console.log('Indexing worker: Fetching fulfilled...');
        threads.parentPort.postMessage({ type: 'fulfilled' });
    })
        .catch(function (error) { return console.error("Indexing worker error: " + error.message); });
};
var updateWithEvoLevel = function (data) {
    return axios.get(API_BASE + "/evolution-chain?limit=-1")
        .then(function (response) {
        var urls = response.data.results.map(function (_) { return _.url; });
        return fetching(urls, function (chunk) {
            var result = [];
            chunk.forEach(function (elem) {
                var evoChain = getEvolutionChain(elem.chain);
                evoChain.forEach(function (level, id) {
                    level.forEach(function (name) {
                        var item = data.find(function (_) { return _.name === name; });
                        if (item)
                            result.push(__assign({}, item, { evoLevel: id + 1, evoChain: evoChain }));
                    });
                });
            });
            return result;
        });
    });
};
var getEvolutionChain = function (chain) {
    var result = [[chain.species.name]];
    var recur = function (chain, id) {
        if (id === void 0) { id = 1; }
        if (chain.evolves_to.length) {
            chain.evolves_to.map(function (elem) {
                result[id] = result[id] ? result[1].concat([elem.species.name]) : [elem.species.name];
                recur(elem, id + 1);
            });
        }
    };
    recur(chain);
    return result;
};
var fetching = function (urls, cb) {
    return new Promise(function (resolve, reject) {
        var urlStream = new StreamFromUrl(urls, CONCURRENT_COUNT);
        var result = [];
        urlStream.on('data', function (chunk) {
            console.log('Indexing worker: chunk received');
            result.push.apply(result, cb(chunk));
        });
        urlStream.on('error', function (error) { return reject(error); });
        urlStream.on('end', function () {
            resolve(result);
        });
    });
};
module.exports = {
    fetching: fetching
};
//# sourceMappingURL=indexationWorker.js.map