const redis = require('redis');
const util = require('util');

const client = redis.createClient(process.env.REDIS_HOST);

client.on('connect', () => {
  console.info('Connected to Redis!');
});

const asyncClient = {
  get: util.promisify(client.get).bind(client),
  set: util.promisify(client.set).bind(client),
  hmset: util.promisify(client.hmset).bind(client),
  hmget: util.promisify(client.hmget).bind(client),
  hmgetall: util.promisify(client.hgetall).bind(client),
  expire: util.promisify(client.expire).bind(client),
  del: util.promisify(client.del).bind(client),
  incr: util.promisify(client.incr).bind(client),
  ttl: util.promisify(client.ttl).bind(client),
  smembers: util.promisify(client.smembers).bind(client),
  decr: util.promisify(client.decr).bind(client),
  decrby: util.promisify(client.decrby).bind(client),
};

module.exports = {
  client,
  redis: asyncClient,
};
