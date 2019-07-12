jest.mock('ioredis');
jest.mock('worker_threads');
jest.mock('./indexator');
jest.mock('./selectors');
const Redis = require('ioredis');
const Threads = require('worker_threads');
const Indexator = require('./indexator');
const { getEntityData } = require('./selectors');

const {
  messageHandler,
  init,
  addIndexListening,
  indexingPromise,
  interceptor,
  state,
  getPokemon
} = jest.requireActual('./indexator');

describe('messageHandler() tests', () => {
  const setMock = Redis.prototype.set;
  // const getMock = Redis.prototype.get.mockImplementation((i, cb) => {
  //   cb(null, JSON.stringify([{id: 9}]));
  // });
  const postMessage = Threads.Worker.prototype.postMessage;
  getEntityData.mockImplementation(_ => _);

  afterEach(() => {
    setMock.mockReset();
    //getMock.mockReset();
    postMessage.mockReset();
  });

  test('Should set values via client.set', () => {
    const message = {
      type: 'data',
      value: [{id: 1}, {id: 77}, {id: 33}]
    };

    messageHandler(message);
    expect(setMock).toHaveBeenCalledTimes(3);
    expect(setMock.mock.calls).toEqual([
      [1, JSON.stringify(message.value[0])],
      [77, JSON.stringify(message.value[1])],
      [33, JSON.stringify(message.value[2])]
    ]);
  });

  test('On start() should be posted message with type run', () => {
    const message = {type: 'run'};
    init();
    expect(postMessage).toHaveBeenCalledWith(message);
  });

  test('Should add function to callbacks array', () => {
    const name = 'end';
    const cb = e => e;

    addIndexListening(name, cb);
    expect(state.callbacks.end[0].toString()).toEqual('e => e');
  });

  test('Should create promise which will be resolved when end event occurred', async () => {
    const message = {type: 'fulfilled'};
    indexingPromise()
      .then(
        () => expect(Indexator.addIndexListening).toBeCalled(),
        console.log
      );
    messageHandler(message);
  });

  test('Should return passed element on first next() call if is not running', () => {
    const next = {id: 99};
    const gen = interceptor(next);
    expect(gen.next().value).toEqual({id: 99});
  });

  // test('', () => {
  //   state.running = true;
  //   console.log({running: state.running});
  //   Indexator.indexingPromise = jest.fn(e => e);
  //   const next = {id: 77};
  //   const gen = interceptor(next);
  //
  //   expect(gen.next().value.toString()).toEqual('e => e');
  //   expect(Indexator.indexingPromise).toBeCalled();
  //   expect(gen.next().value).toEqual({id: 77});
  // });

  test('getPokemon(): Should return data filtered by selector if full parameter is not passed', async () => {
    const getMock = Redis.prototype.get.mockImplementation((i, cb) => {
      cb(null, JSON.stringify([{id: 9}]));
    });
    getEntityData.mockImplementation(_ => _);
    const id = 7;
    const data = await getPokemon(id);

    expect(getMock).toBeCalled();
    expect(getEntityData).toBeCalled();
    expect(data).toEqual([{id: 9}]);
    getMock.mockReset();
  });

  test('getPokemon(): Should return all data stored in redis', async () => {
    const getMock = Redis.prototype.get.mockImplementation((i, cb) => {
      cb(null, JSON.stringify([{id: 9}]));
    });
    getEntityData.mockImplementation(_ => _);
    const id = 7;
    const full = true;
    const data = await getPokemon(id, full);

    expect(getMock).toBeCalled();
    expect(getEntityData).not.toBeCalled();
    expect(data).toEqual([{id: 9}]);

    getMock.mockReset();
  });
});

