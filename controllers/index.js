import { readdirSync } from 'fs'

const __dirname = new URL('.', import.meta.url).pathname

const files = readdirSync(__dirname).filter(
  (file) => file.endsWith('.js') && file !== 'index.js'
)
const controllers = {}

console.log(`processing controllers ...`)

/**
 * 扫描controllers文件夹下所有文件，保存至controllers对象中
 * 键为method + url
 * 值为对应处理函数
 */
files.forEach(async (file) => {
  const { default: controller } = await import(`./${file}`)
  for (const url in controller) {
    controllers[url] = controller[url]
  }
})

logger.info('Controllers mapped')

export default controllers
