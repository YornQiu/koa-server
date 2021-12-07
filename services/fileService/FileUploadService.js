const { createReadStream, createWriteStream } = require('fs')
const { unlink } = require('fs/promises')
const utils = require('@utils')
const path = require('path')

class FileUploadService {
  /**
   * constructor
   * @param {string} uploadPath 文件保存路径
   * @param {boolean} rename 是否重命名同名文件，默认为true，为false时会覆盖同名文件
   * @param {string[]} types 允许的文件类型
   */
  constructor(uploadPath, rename, types) {
    this.uploadPath = uploadPath || '/data'
    this.uploadDir = path.join(config.publicDir, this.uploadPath)
    this.types = types || []
    this.rename = rename === false ? false : true
  }

  /**
   * check file type
   * @param {File} file
   * @returns {boolean}
   */
  checkType(file) {
    // do not check if types is empty
    if (this.types.length === 0) {
      return true
    }
    const fileExt = file.name.split('.').pop()
    if (this.types.indexOf(fileExt) !== -1) {
      return true
    }
    return false
  }

  /**
   * write file with stream
   * @param {File} file
   * @returns {object} result
   */
  async writeFile(file) {
    const { uploadDir, uploadPath, rename } = this

    if (!this.checkType(file)) {
      return {
        status: false,
        fileName: file.name,
        msg: '文件格式错误',
      }
    }

    let fileName = file.name
    let filePath = path.join(uploadDir, fileName)

    // check if the file exists and needs to be renamed
    if ((await utils.exists(filePath)) && rename) {
      const ext = path.extname(fileName)
      const base = path.basename(fileName, ext)

      let index = 1
      while (index) {
        fileName = `${base}(${index})${ext}`
        filePath = path.join(uploadDir, fileName)
        if (await utils.exists(filePath)) {
          index += 1
        } else break
      }
    }

    const reader = createReadStream(file.path)
    const writer = createWriteStream(filePath)

    // promisify the callback function
    // NOTE: stream/promises api is available, but requires nodejs v15.0.0+
    await new Promise((resolve, reject) => {
      reader.pipe(writer)
      reader.on('end', async () => {
        await unlink(file.path) // remove temporary file after stream end
        resolve()
      })
      reader.on('error', (err) => reject(err))
    })

    return {
      status: true,
      fileName,
      filePath: `${uploadPath}/${fileName}`,
    }
  }

  async execute(ctx) {
    // mkdir if the dir doesn't exist
    utils.mkdirsSync(this.uploadDir)

    const fileResults = []
    const fileForm = ctx.request.files || {}

    try {
      for (const key in fileForm) {
        const files = fileForm[key]
        if (Object.prototype.toString.call(files) === '[object Array]') {
          for (const file of files) {
            fileResults.push(await this.writeFile(file))
          }
        } else {
          fileResults.push(await this.writeFile(files))
        }
      }

      ctx.result = fileResults
    } catch (error) {
      if (error.code === 'EACCES') {
        ctx.error = '文件拒绝访问'
      } else {
        ctx.error = '保存文件出错'
      }
      console.log(error)
    }
  }
}

module.exports = FileUploadService
