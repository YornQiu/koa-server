const { logger } = require('@middlewares/logger')

// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 回传遵循这样的格式：{ code: 0, msg: string, data: any }
const responseHandler = (ctx) => {
  if (ctx.result !== undefined) { //处理成功
    ctx.type = 'json'
    ctx.body = {
      status: true,
      code: ctx.code || 200,
      data: ctx.result
    }
  } else if (ctx.error !== undefined) { //处理失败
    ctx.type = 'json'
    ctx.body = {
      status: false,
      code: ctx.code || 0,
      msg: ctx.error,
    }
  }
}

// 这个middleware处理在其它middleware中出现的异常
// 并将异常消息回传给客户端：{ code: '错误代码', message: '错误信息' }
const errorHandler = (ctx, next) => {
  return next().catch(err => {
    if (err.code) {
      ctx.status = err.code
      ctx.body = err.message
    } else {
      logger.error(err.stack)
      ctx.status = 500
      ctx.body = err.message || err.stack
    }
    return Promise.resolve()
  })
}

module.exports = {
  responseHandler,
  errorHandler
}
