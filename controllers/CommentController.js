const CommentService = require('@services').CommentService
const { InvalidQueryError } = require('@libs/error')

module.exports = {
  'GET /api/comment/list': async (ctx, next) => {
    const { article_id } = ctx.query
    if (!article_id) {
      throw new InvalidQueryError()
    }
    const result = await CommentService.findMany({ article_id })
    if (!result) {
      ctx.error = '获取评论失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  'DELETE /api/comment/:id': async (ctx, next) => {
    const { id } = ctx.params
    if (!id) {
      throw new InvalidQueryError()
    }
    const result = await CommentService.deleteById(id)
    if (!result) {
      ctx.error = '评论不存在'
    } else {
      ctx.result = result
    }
    return next()
  },
  'POST /api/comment': async (ctx, next) => {
    const data = ctx.request.body
    if (!data) {
      throw new InvalidQueryError()
    }
    const result = await CommentService.save(data)
    if (!result) {
      ctx.error = '发布失败'
    } else {
      ctx.result = ''
    }
    return next()
  },
  'PUT /api/comment/:id': async (ctx, next) => {
    const { id } = ctx.params
    const data = ctx.request.body
    if (!data || !id) {
      throw new InvalidQueryError()
    }
    const result = await CommentService.updateById(id, data)
    if (!result) {
      ctx.error = '保存更改失败'
    } else {
      ctx.result = ''
    }
    return next()
  },
}
