const { InvalidQueryError } = require('@libs/error')
const { ArticleService } = require('@services')

module.exports = {
  'GET /article/list': async (ctx, next) => {
    const { pageNum, pageSize } = ctx.request.query
    const result = await ArticleService.findByPage({ state: 1 }, pageNum, pageSize)
    if (!result) {
      ctx.error = '获取列表失败'
    } else {
      ctx.result = result
    }

    return next()
  },
  'GET /article/:id': async (ctx, next) => {
    const { id } = ctx.request.params
    if (!id) {
      throw new InvalidQueryError()
    }
    const result = await ArticleService.findById(id)
    if (!result) {
      ctx.error = '文章不存在'
    } else {
      ctx.result = result
    }

    return next()
  },
}
