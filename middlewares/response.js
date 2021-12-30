// 将ctx.result中的内容格式化并回传给客户端
// 格式：{ code: 200, msg: string, data: any }
const responseHandler = (ctx) => {
  if (ctx.result !== undefined) {
    //处理成功
    ctx.type = 'json'
    ctx.body = {
      code: ctx.code || 200,
      data: ctx.result,
      msg: ctx.msg || null,
    }
  } else if (ctx.error !== undefined) {
    //处理失败
    ctx.type = 'json'
    ctx.body = {
      code: ctx.code || 500,
      msg: ctx.error,
      data: ctx.data || null,
    }
  }
}

// 处理在其它middleware中出现的异常并将异常消息回传给客户端
// 格式：{ code: 500, msg: string }
const errorHandler = (ctx, next) => {
  return next().catch((err) => {
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
  errorHandler,
}
