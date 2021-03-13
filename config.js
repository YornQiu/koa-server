const path = require('path')

module.exports = {
  port: '10081',
  tokenConfig: {
    secret: 'havana',
    expired: 60 * 60 * 24 //1d 
  },
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
