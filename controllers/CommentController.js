const CommentService = require('../services').CommentService
const { InvalidQueryError } = require('../lib/error')

module.exports = {
  'POST /api/getComment': async (ctx, next) => {
    const { article_id } = ctx.request.body
    if (!article_id) {
      throw new InvalidQueryError()
    }
    const result = CommentService.findMany({ article_id })
    if (!result) {
      ctx.error = '获取评论失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  'POST /api/delComment': async (ctx, next) => {
    const { id } = ctx.request.body
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
  'POST /api/postComment': async (ctx, next) => {
    const data = ctx.request.body
    if (!data) {
      throw new InvalidQueryError()
    }
    data.create_time = new Date().getTime()
    const result = await CommentService.save(data)
    if (!result) {
      ctx.error = '发布失败'
    } else {
      ctx.result = ''
    }
    return next()
  },
  'POST /api/modifyComment': async (ctx, next) => {
    const { data } = ctx.request.body
    if (!data || !data.id) {
      throw new InvalidQueryError()
    }
    data.modify_time = new Date().getTime()
    const result = await CommentService.updateById(data.id, { data })
    if (!result) {
      ctx.error = '保存更改失败'
    } else {
      ctx.result = ''
    }
    return next()
  },
}
