const redis = require('redis')

const { host, port } = config.redis

const url = `${host}:${port}`
const client = redis.createClient(port, host)

client.connect()

client.on('connect', () => logger.info(`Connected to redis: ${url}`))

client.on('end', () => logger.info(`Closed connection to redis: ${url}`))

client.on('error', () => logger.error(`Failed to connect to redis: ${url}`))

client.on('ready', () => logger.info(`Redis is ready.`))

module.exports = client
