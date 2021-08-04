const FileUploadService = require('@services/fileService/FileUploadService')

module.exports = {
  'GET /': async (ctx, next) => {
    ctx.result = "Hello World!";
    return next();
  },
  'GET /api/index': async (ctx, next) => {
    ctx.result = "Hello World!";
    return next();
  },
  'POST /api/upload': async (ctx, next) => {
    
    const fileUploadService = new FileUploadService()
    fileUploadService.execute(ctx)
    return next()
  }
}
