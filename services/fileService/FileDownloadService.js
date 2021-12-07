const path = require('path')
const { stat } = require('fs/promises')
const { createReadStream } = require('fs')

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
      const readStream = createReadStream(filePath)
      const filename = fileName
        ? fileName + path.extname(filePath)
        : path.basename(filePath)

      ctx.set('Content-type', 'application/octet-stream')
      ctx.set(
        'Content-Disposition',
        'attachment;filename=' + encodeURIComponent(filename)
      )
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
