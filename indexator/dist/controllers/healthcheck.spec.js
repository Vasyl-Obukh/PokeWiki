jest.mock('../utils/indexator');
const { getTimestamp } = require('../utils/indexator');
const { checkHealth } = require('./healthcheck');
describe('checkHealth() tests', () => {
    const self = { response: {} };
    test('Should call "getTimeStamp" and set response status to 200 if timestamp existed', () => {
        const gen = checkHealth.apply(self);
        gen.next();
        gen.next('success');
        expect(getTimestamp).toBeCalled();
        expect(self.response.status).toBe(200);
    });
    test('Should call "getTimeStamp" and set response status to 503 if timestamp is missing', () => {
        const gen = checkHealth.apply(self);
        gen.next();
        gen.next(null);
        expect(getTimestamp).toBeCalled();
        expect(self.response.status).toBe(503);
    });
});
