jest.mock('../utils/indexator.ts');
const { init } = require('../utils/indexator.ts');
const { run } = require('./run');

describe('Run() tests', () => {
  const self = {response: {}};

  test('Should call "init" and set response status to 200', () => {
    run.apply(self);

    expect(init).toBeCalled();
    expect(self.response.status).toBe(200);
  });
});