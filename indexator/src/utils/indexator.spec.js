jest.mock('ioredis');
jest.mock('worker_threads');
jest.useFakeTimers();
const Redis = require('ioredis');
const Threads = require('worker_threads');
const {
  state,
  messageHandler,
  init,
  getTimestamp,
  updateState,
  deleteOldData
} = require('./indexator');

describe('Indexator tests', () => {
  const setMock = Redis.prototype.set,
    delMock = Redis.prototype.del,
    getMock = Redis.prototype.get,
    postMessage = Threads.Worker.prototype.postMessage;

  afterEach(() => {
    setMock.mockReset();
    delMock.mockReset();
    getMock.mockReset();
    postMessage.mockReset();
    state.count = 0;
    state.timestamp = 0;
  });

  test('updateState(): should assign new values to old "count" and "timestamp" and set "count" to 0', () => {
    state.count = 15;
    state.timestamp = '12354';

    updateState();

    expect(state.timestampOld).toBe('12354');
    expect(state.countOld).toBe(15);
    expect(state.count).toBe(0);
  });

  test('deleteOldData(): should call "client.del" for every item from old timestamp if timestampOld is initialized', () => {
    state.timestampOld = '12354';
    state.countOld = 5;

    deleteOldData();

    expect(delMock.mock.calls).toEqual([
      ['12354_1'], ['12354_2'], ['12354_3'], ['12354_4'], ['12354_5']
    ]);
  });

  test('getTimestamp(): should return data from redis', () => {
    getTimestamp();

    expect(getMock).toHaveBeenCalledWith('timestamp');
  });

  test('messageHandler(): on message type "data" should set values via "client.set()" and assign max "id" to "count"', () => {
    const message = {
      type: 'data',
      value: [{id: 1}, {id: 77}, {id: 33}]
    };

    messageHandler(message);

    expect(setMock).toHaveBeenCalledTimes(3);
    expect(setMock.mock.calls).toEqual([
      /* eslint-disable no-useless-escape */
      ['0_1', '{\"id\":1}'],
      ['0_77', '{\"id\":77}'],
      ['0_33', '{\"id\":33}']
    ]);
    expect(state.count).toBe(77);
  });

  test('messageHandler(): on message type "fulfilled" should should set new timestamp and count and call function for delete old values and for update current', () => {
    state.timestamp = '13245';
    state.count = 54;
    const message = {type: 'fulfilled'};

    messageHandler(message);

    expect(setMock.mock.calls).toEqual([
      ['timestamp', '13245'],
      ['count', 54]
    ]);
  });

  test('messageHandler(): should write error to the console if message type did not match anyone known', () => {
    const message = {type: 'unknown'};
    const consoleSpy = jest.spyOn(global.console, 'error');

    messageHandler(message);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(String));
  });

  test('messageHandler(): should write message to the console if it has no type', () => {
    const message = 'Test message';
    const consoleSpy = jest.spyOn(global.console, 'log');

    messageHandler(message);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(String));
  });

  test('init(): should be posted message with type "run" and "running" set to true', () => {
    init();

    expect(postMessage).toHaveBeenCalledWith({type: 'run'});
  });
});
