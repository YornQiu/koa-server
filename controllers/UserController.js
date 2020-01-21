const jwt = require('jsonwebtoken')
const tokenConfig = require('../config').tokenConfig
const UserService = require('../services').UserService
const { InvalidQueryError } = require('../lib/error')

module.exports = {
  'POST /api/login': async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      throw new InvalidQueryError()
    }
    const user = await UserService.findOne({ username })
    if (!user) {
      ctx.error = '用户不存在'
      ctx.code = 0
    } else if (user.password !== password) {
      ctx.error = '密码错误'
    } else {
      ctx.result = {
        userInfo: {
          id: user._id,
          username: user.username,
          nickname: user.nickname,
        },
        token: jwt.sign({
          data: user._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), //设置 token 过期时间: 3d
        }, tokenConfig.secret)
      }
    }

    return next()
  },
  'POST /api/register': async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      throw new InvalidQueryError()
    }
    if (await UserService.findOne({ username })) {
      ctx.error = '用户已存在'
    } else {
      const user = UserService.save({ username, password })
      ctx.result = {
        userInfo: {
          id: user._id,
          username: user.username,
          nickname: user.nickname,
        },
        token: jwt.sign({
          data: user._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), //设置 token 过期时间: 3d
        }, tokenConfig.secret)
      }
    }

    return next()
  }
}
