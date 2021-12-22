import { createConnection } from 'mongoose'
import { logger } from '@middlewares/logger'

const DBConfig = config.mongoDB

const url = `mongodb://${DBConfig.user}:${DBConfig.pwd}@${DBConfig.host}:${DBConfig.port}/${DBConfig.db}?authSource=${DBConfig.authSource}`
const mongo = createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) //创建一个数据库连接

mongo.on('connected', () => logger.info(`Connected to database: ${url}`))

mongo.on('error', () => logger.error(`Failed to connect to database: ${url}`))

mongo.on('disconnected', () =>
  logger.info(`Closed connection to database: ${url}`)
)

mongo.once('open', () => logger.info('MongoDB is opened'))

export default mongo
