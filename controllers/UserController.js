const { sign } = require('@middlewares/jwt')
const utils = require('@utils')
const UserService = require('@services').UserService
const { InvalidQueryError } = require('@libs/error')
const { verify } = require('@middlewares/jwt')

module.exports = {
  'POST /user/login': async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      throw new InvalidQueryError()
    }
    const user = await UserService.findOne({ username })
    if (!user) {
      ctx.error = '用户不存在'
      ctx.code = -1
    } else {
      const pwd = config.encrypt ? utils.decrypt(password) : password
      if (user.password !== utils.md5(pwd)) {
        ctx.error = '密码错误'
      } else {
        ctx.result = sign(user.id)
      }
    }

    return next()
  },
  'POST /user/register': async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      throw new InvalidQueryError()
    }
    if (await UserService.findOne({ username })) {
      ctx.error = '用户已存在'
    } else {
      const user = await UserService.save({
        username,
        password: utils.md5(password),
      })
      ctx.result = {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        token: sign(user.id),
      }
    }

    return next()
  },
  'GET /user/me': async (ctx, next) => {
    verify(ctx)
    const id = ctx.jwtData.data
    const user = await UserService.findById(id)
    ctx.result = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
    }

    return next()
  },
  'GET /user/refresh': async (ctx, next) => {
    verify(ctx)
    const id = ctx.jwtData.data
    ctx.result = sign(id)

    return next()
  },
}
