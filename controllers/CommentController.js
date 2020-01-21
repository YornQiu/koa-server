const CommentService = require('../services').CommentService
const { InvalidQueryError } = require('../lib/error')

module.exports = {
  'POST /api/getComment': async (ctx, next) => {
    const { article_id } = ctx.request.body
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
  'POST /api/delComment': async (ctx, next) => {
    const { _id } = ctx.request.body
    if (!_id) {
      throw new InvalidQueryError()
    }
    const result = await CommentService.deleteById(_id)
    if (!result) {
      ctx.error = '评论不存在'
    } else {
      ctx.result = result
    }
    return next()
  },
  'POST /api/postComment': async (ctx, next) => {
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
  'POST /api/modifyComment': async (ctx, next) => {
    const data = ctx.request.body
    if (!data || !data._id) {
      throw new InvalidQueryError()
    }
    const result = await CommentService.updateById(data._id, data)
    if (!result) {
      ctx.error = '保存更改失败'
    } else {
      ctx.result = ''
    }
    return next()
  },
}
