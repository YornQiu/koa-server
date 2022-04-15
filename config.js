const path = require('path')

const PROJECT_NAME = 'koa-server'

module.exports = {
  name: PROJECT_NAME,
  port: '8881',
  tokenConfig: {
    secret: 'havana',
    expired: 60 * 60 * 0.5, //0.5h
    refresh: 60 * 60 * 1, // 1h
  },
  encrypt: false, // 是否使用加密算法处理密码，默认不处理
  publicDir: path.resolve(__dirname, './public'), // 资源文件路径
  viewsDir: path.resolve(__dirname, './views'), // 静态页面文件路径
  logPath: path.resolve(__dirname, `./logs/${PROJECT_NAME}`), // 日志文件路径
  mongoDB: {
    host: '127.0.0.1',
    port: 27017,
    user: 'root',
    pwd: 'root',
    db: 'test',
    authSource: 'admin',
  },
}
