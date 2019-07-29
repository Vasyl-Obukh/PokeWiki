jest.mock('../utils/indexator');
const { init } = require('../utils/indexator');
const { runIndexation } = require('./run');

describe('Run() tests', () => {
  const self = {response: {}};

  test('Should call "init" and set response status to 200', () => {
    runIndexation.apply(self);

    expect(init).toBeCalled();
    expect(self.response.status).toBe(200);
  });
});