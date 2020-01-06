const path = require('path')

module.exports = {
  port: '10081',
  secret: 'koa',
  publicDir: path.resolve(__dirname, './public'),
  viewsDir: path.resolve(__dirname, './views'),
  logPath: path.resolve(__dirname, './logs/koa-server'),
  mongoDB: {
    host: '127.0.0.1',
    port: 27017,
    user: '',
    pwd: '',
    db: 'test',
  }
}
