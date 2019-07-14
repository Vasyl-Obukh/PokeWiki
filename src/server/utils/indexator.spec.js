jest.mock('ioredis');
jest.mock('worker_threads');
jest.useFakeTimers();
const Redis = require('ioredis');
const Threads = require('worker_threads');
const {
  state,
  messageHandler,
  init,
  startWithInterval,
  addIndexListening,
  indexationPromise,
  interceptor,
  getPokemon,
  getPokemons
} = require('./indexator');


describe('Indexator tests', () => {
  const setMock = Redis.prototype.set,
    postMessage = Threads.Worker.prototype.postMessage;

  afterEach(() => {
    setMock.mockReset();
    postMessage.mockReset();
    state.callbacks.end = [];
    state.running = false;
    state.count = 0;
  });

  test('messageHandler(): should set values via "client.set()" on message type "data" and assign max "id" to "count"', () => {
    const message = {
      type: 'data',
      value: [{id: 1}, {id: 77}, {id: 33}]
    };

    messageHandler(message);

    expect(setMock).toHaveBeenCalledTimes(3);
    expect(setMock.mock.calls).toEqual([
      /* eslint-disable no-useless-escape */
      [1, '{\"id\":1}'],
      [77, '{\"id\":77}'],
      [33, '{\"id\":33}']
    ]);
    expect(state.count).toBe(77);
  });

  test('messageHandler(): on message type "fulfilled" should set running to false, execute all callbacks for "end" event and clear array', () => {
    const message = {type: 'fulfilled'},
      cb = jest.fn();

    state.running = true;
    state.callbacks.end.push(cb);

    messageHandler(message);

    expect(state.running).toBe(false);
    expect(cb).toBeCalled();
    expect(state.callbacks.end).toEqual([]);
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
    expect(state.running).toBe(true);
  });

  test('startWithInterval(): should call "init()" every defined minutes', () => {
    const minutes = 15;

    startWithInterval(minutes);

    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 900000);
  });

  test('addIndexListening(): should add function to callbacks array for "end" event', () => {
    const name = 'end',
      cb = e => e;

    addIndexListening(name, cb);

    expect(state.callbacks.end[0].toString()).toEqual('e => e');
  });

  test('Should create promise which will be resolved when "end" event occurred', () => {
    const next = {id: 2};

    indexationPromise(next)
      .then(result => expect(result).toEqual({id: 2}))
      .catch(console.log);
    messageHandler({type: 'fulfilled'});
  });

  test('Should return passed element on first "next()" call if "running" is false', () => {
    const next = {id: 99};
    state.running = false;

    const gen = interceptor(next);

    expect(gen.next().value).toEqual({id: 99});
  });

  test('Should return promise on first "next()" and passed element on second', () => {
    const next = {id: 77};
    state.running = true;

    const gen = interceptor(next);

    expect(gen.next().value).toEqual(expect.any(Promise));
    expect(gen.next().value).toEqual({id: 77});
  });
});

describe('Indexator: getPokemon() & getPokemons() tests', () => {
  const getMock = Redis.prototype.get.mockImplementation((id, cb) => {
    const db = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
    cb(null, JSON.stringify(db.find(_ => _.id = id)));
  });

  afterEach(() => {
    getMock.mockClear();
  });

  test('getPokemon(): Should return object with predefined id field', async () => {
    const id = 3;

    const data = await getPokemon(id);

    expect(getMock).toBeCalled();
    expect(data).toEqual({id: 3});
  });

  test('getPokemons(): should return array with all data if arguments is not passed', async () => {
    state.count = 5;

    const result = await getPokemons();

    expect(result).toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
  });

  test('getPokemons(): should return array with part of array of pokemons data predefined by range arguments', async () => {
    state.count = 5;
    const from = 2,
      to = 4;

    const result = await getPokemons(from, to);

    expect(result).toEqual([{id: 2}, {id: 3}, {id: 4}]);
  });
});
