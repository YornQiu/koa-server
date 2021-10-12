const fs = require('fs')
const path = require('path')

/**
 * 初始化参数设置
 * @param {string} 文件路径
 * @param {string} 下载时的文件名称
 */
class FileDownloadService {
  constructor(filePath, fileName) {
    this.filePath = filePath
    this.fileName = fileName
  }

  execute(ctx) {
    const { filePath, fileName } = this
    if(!fs.existsSync(filePath)) {
      console.log('文件不存在：' + filePath)
      ctx.error = '文件不存在'
    } else {
      try {
        const stat = fs.statSync(filePath)
        const filename = fileName ? fileName + path.extname(filePath) : path.basename(filePath)
        const fileStream = fs.createReadStream(filePath)
        
        ctx.set('Content-type', 'application/octet-stream')
        ctx.set('Content-Disposition', 'attachment;filename=' + encodeURIComponent(filename))
        ctx.set('Content-Length', stat.size)
        ctx.body = fileStream
      } catch (error) {
        console.log(error)
        ctx.error = '获取文件失败'
      }
    }
  }
}

module.exports = FileDownloadService
