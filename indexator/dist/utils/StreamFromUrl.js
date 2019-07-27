var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Readable = require('stream').Readable;
var axios = require('axios');
var StreamFromUrl = /** @class */ (function (_super) {
    __extends(StreamFromUrl, _super);
    function StreamFromUrl(array, concurrentCount) {
        if (concurrentCount === void 0) { concurrentCount = 1; }
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.concurrent = concurrentCount;
        _this.total = array.length;
        _this.todo = array;
        _this.index = 0;
        return _this;
    }
    StreamFromUrl.prototype._read = function () {
        var _this = this;
        if (this.index < this.total) {
            var promises = this.todo
                .slice(this.index, this.index + this.concurrent)
                .map(function (_) { return axios.get(_).then(function (_) { return _.data; }); });
            Promise.all(promises)
                .then(function (data) {
                console.log("Data received: " + data.length + " element(s) of type " + typeof data[0]);
                _this.push(data);
            })
                .catch(function (error) { return console.error("error: " + error.message); });
            this.index += this.concurrent;
        }
        else {
            this.push(null);
        }
    };
    return StreamFromUrl;
}(Readable));
module.exports = StreamFromUrl;
//# sourceMappingURL=StreamFromUrl.js.map