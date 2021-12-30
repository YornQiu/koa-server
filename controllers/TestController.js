import FileUploadService from '#services/fileService/FileUploadService.js'
import FileDownloadService from '#services/fileService/FileDownloadService.js'

export default {
  'GET /': async (ctx, next) => {
    ctx.result = 'Hello World!'
    return next()
  },
  'GET /index': async (ctx, next) => {
    ctx.result = 'Hello World!'
    return next()
  },
  'POST /upload': async (ctx, next) => {
    const fileUploadService = new FileUploadService()
    await fileUploadService.execute(ctx)

    return next()
  },
  'GET /download': async (ctx, next) => {
    const fileDownloadService = new FileDownloadService(
      config.publicDir + '/img/2020/01/Koala.jpg',
      '考拉'
    )
    await fileDownloadService.execute(ctx)

    return next()
  },
}
