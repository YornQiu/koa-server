const FileUploadService = require('@services/fileService/FileUploadService')
const FileDownloadService = require('@services/fileService/FileDownloadService')

module.exports = {
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
    fileUploadService.execute(ctx)

    return next()
  },
  'GET /download': async (ctx, next) => {
    const fileDownloadService = new FileDownloadService(
      config.publicDir + '/img/2020/0/Koala.jpg',
      '考拉'
    )
    fileDownloadService.execute(ctx)

    return next()
  },
}
