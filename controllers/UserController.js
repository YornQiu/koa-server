const { sign } = require('../middlewares/jwt')
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
        id: user._id,
        username: user.username,
        nickname: user.nickname,
        token: sign(user._id)
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
        id: user._id,
        username: user.username,
        nickname: user.nickname,
        token: sign(user._id)
      }
    }

    return next()
  }
}
