const redis = jest.genMockFromModule('ioredis');
redis.prototype.get.mockImplementation((key, callback) => {
  callback(null, null);
});

redis.prototype.set.mockImplementation((key, value, callback) => {
  callback(null, null);
});

module.exports = redis;