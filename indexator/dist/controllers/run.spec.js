jest.mock('../utils/indexator.ts');
var init = require('../utils/indexator.ts').init;
var run = require('./run').run;
describe('Run() tests', function () {
    var self = { response: {} };
    test('Should call "init" and set response status to 200', function () {
        run.apply(self);
        expect(init).toBeCalled();
        expect(self.response.status).toBe(200);
    });
});
//# sourceMappingURL=run.spec.js.map