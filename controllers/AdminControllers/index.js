import { readdirSync } from 'fs'

const files = readdirSync(__dirname).filter(
  (file) => file.endsWith('.js') && file !== 'index.js'
)
const controllers = {}

/**
 * 扫描controllers文件夹下所有文件，保存至controllers对象中
 * 键为method + url
 * 值为对应处理函数
 */
files.forEach((file) => {
  const controller = require(`./${file}`)
  for (const url in controller) {
    controllers[url] = controller[url]
  }
})

export default controllers
