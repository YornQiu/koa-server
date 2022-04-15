const mongoose = require('mongoose')

const { mongoDB } = config

const url = `mongodb://${mongoDB.user}:${mongoDB.pwd}@${mongoDB.host}:${mongoDB.port}/${mongoDB.db}?authSource=${mongoDB.authSource}`
const mongo = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) //创建一个数据库连接

mongo.on('connected', () => logger.info(`Connected to mongoDB: ${url}`))

mongo.on('error', () => logger.error(`Failed to connect to mongoDB: ${url}`))

mongo.on('disconnected', () => logger.info(`Closed connection to mongoDB: ${url}`))

mongo.once('open', () => logger.info('MongoDB is opened'))

module.exports = mongo
