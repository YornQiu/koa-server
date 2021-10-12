const path = require('path')

module.exports = {
  port: '8881',
  tokenConfig: {
    secret: 'havana',
    expired: 60 * 60 * 0.5, //0.5h
    refresh: 60 * 60 * 1 // 1h
  },
  encrypt: false,
  publicDir: path.resolve(__dirname, './public'),
  viewsDir: path.resolve(__dirname, './views'),
  logPath: path.resolve(__dirname, './logs/koa-server'),
  mongoDB: {
    host: '127.0.0.1',
    port: 27017,
    user: 'root',
    pwd: 'root',
    db: 'test',
    authSource: 'admin',
  }
}
