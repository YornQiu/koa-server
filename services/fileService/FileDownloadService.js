const { extname, basename } = require('path')
const { stat, access } = require('fs/promises')
const { createReadStream, constants } = require('fs')

class FileDownloadService {
  /**
   * constructor
   * @param {string} filePath 文件路径
   * @param {string} fileName 下载时的文件名称
   */
  constructor(filePath, fileName) {
    this.filePath = filePath
    this.fileName = fileName
  }

  async execute(ctx) {
    const { filePath, fileName } = this

    try {
      const stats = await stat(filePath)
      await access(filePath, constants.R_OK)
      const readStream = createReadStream(filePath)
      const filename = fileName ? fileName + extname(filePath) : basename(filePath)

      ctx.set('Content-type', 'application/octet-stream')
      ctx.set('Content-Disposition', 'attachment;filename=' + encodeURIComponent(filename))
      ctx.set('Content-Length', stats.size)
      ctx.body = readStream
    } catch (error) {
      if (error.code === 'EACCES') {
        ctx.error = '文件拒绝访问'
      } else if (error.code === 'ENOENT') {
        ctx.error = '文件不存在'
      } else {
        ctx.error = '获取文件出错'
      }
      console.log(error)
    }
  }
}

module.exports = FileDownloadService
