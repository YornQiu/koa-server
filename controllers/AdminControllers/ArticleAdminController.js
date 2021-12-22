import { ArticleService } from '@services'
import ImgUploadService from '@services/fileService/ImgUploadService'
import { InvalidQueryError } from '@libs/error'

export default {
  'DELETE /article/:id': async (ctx, next) => {
    const { id } = ctx.params
    if (!id) {
      throw new InvalidQueryError()
    }
    const result = await ArticleService.deleteById(id)
    if (!result) {
      ctx.error = '文章不存在'
    } else {
      ctx.result = result
    }
    return next()
  },
  'POST /article': async (ctx, next) => {
    const data = ctx.request.body
    if (!data) {
      throw new InvalidQueryError()
    }
    data.state = 1
    const result = await ArticleService.save(data)
    if (!result) {
      ctx.error = '发布失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  'PUT /article/:id': async (ctx, next) => {
    const { id } = ctx.params
    const data = ctx.request.body
    if (!data || !id) {
      throw new InvalidQueryError()
    }
    const result = await ArticleService.updateById(id, data)
    if (!result) {
      ctx.error = '保存更改失败'
    } else {
      ctx.result = ''
    }
    return next()
  },
  'POST /article/img/upload': async (ctx, next) => {
    //按月存放上传的图片
    const date = new Date()
    const year = date.getFullYear()
    const month = (Array(2).join(0) + (date.getMonth() + 1)).slice(-2)
    const uploadPath = `/img/${year}/${month}`

    const imgUploadService = new ImgUploadService(uploadPath)
    imgUploadService.execute(ctx)
    return next()
  },
  'POST /draft': async (ctx, next) => {
    const data = ctx.request.body
    if (!data) {
      throw new InvalidQueryError()
    }
    data.state = 0
    let result = null
    if (data.id) {
      result = await ArticleService.updateById(data.id, data)
    } else {
      result = await ArticleService.save(data)
    }
    if (!result) {
      ctx.error = '保存失败'
    } else {
      ctx.result = ''
    }
    return next()
  },
  'GET /draft': async (ctx, next) => {
    const result = await ArticleService.findOne({ state: 0 })
    if (!result) {
      ctx.error = '无草稿'
    } else {
      ctx.result = result
    }
    return next()
  },
}
