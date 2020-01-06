const fs = require('fs')
const { logger } = require('../middlewares/logger')

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'index.js')
const controllers = {}
/**
 * 扫描controllers文件夹下所有文件，保存至controllers对象中                
 * 键为method + url   
 * 值为对应处理函数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
 */
console.log(`process controllers ...`)

files.forEach((file) => {
  const controller = require(`./${file}`)
  for (const url in controller) {
    controllers[url] = controller[url]
  }
})

logger.info('Controllers mapped')

module.exports = controllers
