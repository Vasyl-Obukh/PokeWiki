"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { init } = require('../utils/indexator');
function* run() {
    init();
    this.response.status = 200;
}
module.exports = {
    run
};
