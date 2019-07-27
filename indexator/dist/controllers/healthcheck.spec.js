jest.mock('../utils/indexator');
var getTimestamp = require('../utils/indexator').getTimestamp;
var checkHealth = require('./healthcheck').checkHealth;
describe('checkHealth() tests', function () {
    var self = { response: {} };
    test('Should call "getTimeStamp" and set response status to 200 if timestamp existed', function () {
        var gen = checkHealth.apply(self);
        gen.next();
        gen.next('success');
        expect(getTimestamp).toBeCalled();
        expect(self.response.status).toBe(200);
    });
    test('Should call "getTimeStamp" and set response status to 503 if timestamp is missing', function () {
        var gen = checkHealth.apply(self);
        gen.next();
        gen.next(null);
        expect(getTimestamp).toBeCalled();
        expect(self.response.status).toBe(503);
    });
});
//# sourceMappingURL=healthcheck.spec.js.map