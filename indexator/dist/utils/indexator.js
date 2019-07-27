"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var threads = require('worker_threads');
var Worker = threads.Worker;
var worker = new Worker(__dirname + '/indexationWorker.js');
var Redis = require('ioredis');
var client = new Redis(6379, 'redis');
var state = {
    count: 0,
    countOld: 0,
    timestamp: 0,
    timestampOld: 0
};
client.on('connect', function () { return console.log('Redis connected...'); });
client.on('error', function (error) { return console.log("Error happened in redis: " + error.message); });
var updateState = function () {
    state.countOld = state.count;
    state.count = 0;
    state.timestampOld = state.timestamp;
};
var deleteOldData = function () {
    if (state.timestampOld) {
        var timestamp = state.timestampOld;
        for (var i = 1; i <= state.countOld; i++) {
            client.del(timestamp + "_" + i);
        }
    }
};
var messageHandler = function (message) {
    if (message.type) {
        switch (message.type) {
            case 'data':
                message.value.forEach(function (el) {
                    client.set(state.timestamp + "_" + el.id, JSON.stringify(el));
                    state.count = el.id > state.count ? el.id : state.count;
                });
                break;
            case 'fulfilled':
                client.set('timestamp', state.timestamp);
                client.set('count', state.count);
                deleteOldData();
                updateState();
                console.log('Indexation finished...');
                break;
            default:
                console.error("Worker: unknown message type: " + message.type);
        }
    }
    else {
        console.log("Worker message: " + message);
    }
};
worker.on('message', messageHandler);
function init() {
    worker.postMessage({ type: 'run' });
    state.timestamp = Date.now();
    console.log('Indexation started...');
}
var getTimestamp = function () { return client.get('timestamp'); };
module.exports = {
    state: state,
    init: init,
    messageHandler: messageHandler,
    getTimestamp: getTimestamp,
    updateState: updateState,
    deleteOldData: deleteOldData
};
//# sourceMappingURL=indexator.js.map